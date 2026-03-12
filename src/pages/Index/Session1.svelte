<script>
	import { onMount } from 'svelte'
	import Button from '../../components/Button.svelte'
	import QrCodeDisplay from '../../components/QrCodeDisplay.svelte'
	import { getQrCodeBase64, checkConnectionState } from '../../services/evolution.js'
	import {
		getConnectionParamsFromSearch,
		hasRequiredConnectionParams,
		navigateToPath
	} from '../../lib/url.js'
	import { normalizeQrCodeBase64 } from '../../lib/qrcode.js'

	let connectionParams = null
	let connectionState = ''
	let qrCodeBase64 = ''
	let errorMessage = ''
	let infoMessage = ''
	let isCheckingConnection = true
	let isRefreshingQrCode = false

	const getInstanceName = () => connectionParams?.instance || 'instância'

	const resetMessages = () => {
		errorMessage = ''
		infoMessage = ''
	}

	const stopLoading = () => {
		isCheckingConnection = false
		isRefreshingQrCode = false
	}

	async function loadQrCode () {
		if (!hasRequiredConnectionParams(connectionParams)) return

		isRefreshingQrCode = true
		errorMessage = ''

		try {
			const nextQrCode = await getQrCodeBase64(
				connectionParams.domain,
				connectionParams.instance,
				connectionParams.number,
				connectionParams.globalApiKey
			)

			qrCodeBase64 = normalizeQrCodeBase64(nextQrCode)

			if (!qrCodeBase64) {
				throw new Error('A Evolution API não retornou um QR code válido.')
			}
		} catch (error) {
			qrCodeBase64 = ''
			errorMessage = error.message
		} finally {
			isRefreshingQrCode = false
		}
	}

	async function loadConnectionData () {
		isCheckingConnection = true
		resetMessages()

		try {
			connectionParams = getConnectionParamsFromSearch(window.location.search)

			if (!connectionParams || !hasRequiredConnectionParams(connectionParams)) {
				throw new Error('Parâmetros da conexão ausentes ou inválidos. Gere um novo link no assistente.')
			}

			const connection = await checkConnectionState(
				connectionParams.domain,
				connectionParams.instance,
				connectionParams.token
			)

			connectionState = connection.state

			if (connectionState === 'open') {
				qrCodeBase64 = ''
				infoMessage = `A instância ${connection.instanceName} já está conectada ao WhatsApp.`
				return
			}

			await loadQrCode()
		} catch (error) {
			connectionState = ''
			qrCodeBase64 = ''
			errorMessage = error.message
		} finally {
			stopLoading()
		}
	}

	async function regenerateQrCode () {
		resetMessages()
		await loadQrCode()
	}

	onMount(() => {
		loadConnectionData()
	})

	$: isConnected = connectionState === 'open'
	$: hasConnectionParams = hasRequiredConnectionParams(connectionParams)
	$: showQrCode = Boolean(qrCodeBase64) && !isConnected
	$: isQrCodeLoading = isCheckingConnection || isRefreshingQrCode
</script>

<div class="page-overlay">
	<section class="card-shell">
		<header class="card-header">
			<svg class="icon-whatsapp" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
				<path d="M11.996 2a9.98 9.98 0 0 0-8.528 15.17l-1.468 5.314 5.438-1.433a9.976 9.976 0 0 0 4.558 1.09h.004c5.51 0 9.985-4.475 9.985-9.985S17.506 2 11.996 2zm0 18.291c-1.503 0-2.98-.404-4.275-1.166l-.307-.183-3.178.835.849-3.097-.201-.32a8.28 8.28 0 0 1-1.266-4.428C3.618 6.444 8.053 1.97 12 1.97s8.381 4.474 8.381 9.96-4.473 9.961-8.385 9.961zm4.61-6.104c-.252-.127-1.493-.739-1.724-.824-.23-.085-.4-.127-.568.127-.168.254-.652.824-.799.993-.146.168-.293.189-.545.062-1.282-.647-2.311-1.238-3.238-2.618-.124-.184.116-.169.356-.632.084-.168.042-.315-.021-.442-.063-.127-.568-1.372-.778-1.878-.205-.494-.413-.427-.568-.435l-.484-.008c-.168 0-.441.063-.672.315-.23.254-.88.859-.88 2.088s.902 2.414 1.028 2.583c.126.169 1.761 2.688 4.266 3.77.596.257 1.06.411 1.424.526.598.19 1.141.163 1.57.098.483-.075 1.493-.611 1.703-1.201.21-.59.21-1.096.147-1.201-.063-.106-.23-.169-.483-.296z"/>
			</svg>
			<h1>Conectar Instância</h1>
		</header>

		<div class="card-content">
			{#if infoMessage}
				<div class="status-card status-card--success">
					<p>{infoMessage}</p>
				</div>
			{/if}

			{#if errorMessage && !showQrCode}
				<div class="status-card status-card--error">
					<p>{errorMessage}</p>
				</div>
			{/if}

			{#if !isConnected}
				<QrCodeDisplay
					src={qrCodeBase64}
					loading={isQrCodeLoading}
					errorMessage={showQrCode ? '' : errorMessage}
					title={`Autenticação`}
					description="Escaneie o código para conectar ao WhatsApp."
				/>
			{/if}
		</div>

		<footer class="card-actions">
			<Button variant="secondary" on:click={() => navigateToPath('/assistente')}>
				Gerar link
			</Button>
			{#if hasConnectionParams && !isConnected}
				<Button loading={isRefreshingQrCode} on:click={regenerateQrCode}>
					Novo código
				</Button>
			{/if}
		</footer>
	</section>
</div>

<style>
	.page-overlay {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		min-height: 100vh;
		padding: 1.5rem;
	}

	.card-shell {
		width: min(100%, 28rem);
		background: var(--color-surface);
		border-radius: 1rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0,0,0,0.08);
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.card-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1.25rem 1.5rem;
		background: #fff;
		border-bottom: 1px solid var(--color-border-soft);
	}

	.icon-whatsapp {
		width: 1.75rem;
		height: 1.75rem;
		color: var(--color-accent-dark);
	}

	.card-header h1 {
		margin: 0;
		font-size: 1.15rem;
		font-weight: 500;
		color: var(--color-text);
	}

	.card-content {
		padding: 2rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		background: var(--color-surface);
	}

	.card-actions {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.75rem;
		padding: 1rem 1.5rem;
		background: #f7f9fa;
		border-top: 1px solid var(--color-border-soft);
	}

	.status-card {
		padding: 1rem;
		border-radius: 0.5rem;
		text-align: center;
		font-size: 0.9rem;
	}

	.status-card p {
		margin: 0;
		line-height: 1.5;
	}

	.status-card--success {
		background: rgba(37, 211, 102, 0.1);
		color: #0f5132;
		border: 1px solid rgba(37, 211, 102, 0.2);
	}

	.status-card--error {
		background: rgba(239, 76, 76, 0.06);
		color: #842029;
		border: 1px solid rgba(239, 76, 76, 0.15);
	}
</style>

