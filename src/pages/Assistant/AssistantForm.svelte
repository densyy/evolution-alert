<script>
  import Button from '../../components/Button.svelte'
  import Input from '../../components/Input.svelte'
  import { buildConnectionUrl } from '../../lib/url.js'

  let domain = ''
  let instance = ''
  let number = ''
  let token = ''
  let globalApiKey = ''
  let generatedUrl = ''
  let feedbackMessage = ''
  let feedbackType = 'neutral'

  function createConnectionParams () {
    return {
      domain,
      instance,
      number,
      token,
      globalApiKey
    }
  }

  function generateUrl () {
    generatedUrl = buildConnectionUrl({
      path: '/',
      params: createConnectionParams()
    })

    feedbackType = 'success'
    feedbackMessage = 'Link gerado com sucesso.'
  }

  async function copyUrl () {
    if (!generatedUrl) return

    try {
      await navigator.clipboard.writeText(generatedUrl)
      feedbackType = 'success'
      feedbackMessage = 'Link copiado para a área de transferência.'
    } catch (error) {
      feedbackType = 'error'
      feedbackMessage = 'Não foi possível copiar o link automaticamente.'
    }
  }
</script>

<form class="assistant-form" on:submit|preventDefault={generateUrl}>
  <div class="grid">
    <Input
      id="domain"
      label="Domínio do Evolution API"
      bind:value={domain}
      placeholder="evolution-api.densyy.com"
      helpText="Pode informar com ou sem https://"
      required
    />

    <Input
      id="instance"
      label="Nome da instância"
      bind:value={instance}
      placeholder="ChapaDoAgro"
      required
    />

    <Input
      id="number"
      label="Número do telefone"
      bind:value={number}
      placeholder="5599911112222"
      autocomplete="tel"
      required
    />

    <Input
      id="token"
      label="Token da instância"
      bind:value={token}
      placeholder="Token da instância"
      required
    />

    <Input
      id="globalApiKey"
      label="Token global do Evolution API"
      bind:value={globalApiKey}
      placeholder="Token global"
      required
    />
  </div>

  <div class="actions">
    <Button type="submit">Gerar link criptografado</Button>
    {#if generatedUrl}
      <Button variant="secondary" on:click={copyUrl}>Copiar link</Button>
    {/if}
  </div>

  {#if feedbackMessage}
    <p class={`feedback feedback--${feedbackType}`}>{feedbackMessage}</p>
  {/if}

  {#if generatedUrl}
    <div class="result-card">
      <p class="result-label">URL gerada</p>
      <textarea readonly value={generatedUrl}></textarea>
    </div>
  {/if}
</form>

<style>
  .assistant-form {
    display: grid;
    gap: 1.5rem;
  }

  .grid {
    display: grid;
    gap: 1rem;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .feedback {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .feedback--success {
    color: var(--color-success);
  }

  .feedback--error {
    color: var(--color-danger);
  }

  .result-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    border: 1px solid var(--color-border-soft);
    border-radius: 0.75rem;
    background: #f8f9fa;
  }

  .result-label {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  textarea {
    width: 100%;
    min-height: 6rem;
    padding: 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    resize: vertical;
    background: #fff;
    color: var(--color-text);
    font: inherit;
    font-size: 0.85rem;
    line-height: 1.5;
    word-break: break-all;
  }

  textarea:focus {
    outline: none;
    border-color: var(--color-border-focus);
    box-shadow: 0 0 0 2px rgba(18, 140, 126, 0.15);
  }
</style>
