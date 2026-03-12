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

			if (!hasRequiredConnectionParams(connectionParams)) {
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

<section class="page-shell">
	<div class="hero">
		<div class="hero-copy">
			<p class="eyebrow">Evolution Alert</p>
			<h1>Conecte sua instância do WhatsApp com um QR code pronto para uso.</h1>
			<p>
				A rota inicial recebe os parâmetros criptografados pela URL, valida o status da conexão
				na Evolution API e mostra o QR code somente quando a instância ainda não está conectada.
			</p>
		</div>

		<div class="hero-actions">
			<Button variant="secondary" on:click={() => navigateToPath('/assistente')}>
				Abrir assistente de links
			</Button>
			{#if hasConnectionParams && !isConnected}
				<Button loading={isRefreshingQrCode} on:click={regenerateQrCode}>
					Gerar novo QR code
				</Button>
			{/if}
		</div>
	</div>

	{#if infoMessage}
		<section class="status-card status-card--success">
			<h2>Conexão ativa</h2>
			<p>{infoMessage}</p>
		</section>
	{/if}

	{#if errorMessage && !showQrCode}
		<section class="status-card status-card--error">
			<h2>Não foi possível carregar o QR code</h2>
			<p>{errorMessage}</p>
		</section>
	{/if}

	{#if !isConnected}
		<QrCodeDisplay
			src={qrCodeBase64}
			loading={isQrCodeLoading}
			errorMessage={showQrCode ? '' : errorMessage}
			title={`QR code da ${getInstanceName()}`}
			description="Escaneie o código com o WhatsApp para concluir a autenticação da instância."
		/>
	{/if}
</section>

<style>
	.page-shell {
		width: min(100%, 60rem);
		margin: 0 auto;
		display: grid;
		gap: 1.5rem;
	}

	.hero {
		display: grid;
		gap: 1.5rem;
		padding: 1.75rem;
		border: 1px solid var(--color-border-soft);
		border-radius: 1.75rem;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(239, 229, 217, 0.92));
		box-shadow: 0 24px 60px rgba(61, 40, 23, 0.08);
	}

	.hero-copy {
		display: grid;
		gap: 0.75rem;
	}

	.hero-copy h1,
	.hero-copy p {
		margin: 0;
	}

	.hero-copy h1 {
		font-size: clamp(2rem, 5vw, 3.4rem);
		line-height: 1.02;
	}

	.hero-copy p {
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.eyebrow {
		margin: 0;
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-accent-dark);
	}

	.status-card {
		display: grid;
		gap: 0.5rem;
		padding: 1.25rem 1.5rem;
		border-radius: 1.25rem;
		border: 1px solid var(--color-border-soft);
		background: var(--color-surface);
	}

	.status-card h2,
	.status-card p {
		margin: 0;
	}

	.status-card p {
		line-height: 1.6;
	}

	.status-card--success {
		background: rgba(47, 133, 90, 0.08);
		border-color: rgba(47, 133, 90, 0.2);
	}

	.status-card--error {
		background: rgba(187, 82, 59, 0.08);
		border-color: rgba(187, 82, 59, 0.22);
	}

	@media (min-width: 768px) {
		.hero {
			padding: 2.25rem;
		}
	}
</style>

