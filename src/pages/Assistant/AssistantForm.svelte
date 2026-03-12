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
    gap: 0.75rem;
  }

  .feedback {
    margin: 0;
    font-weight: 600;
  }

  .feedback--success {
    color: var(--color-success);
  }

  .feedback--error {
    color: var(--color-danger);
  }

  .result-card {
    display: grid;
    gap: 0.75rem;
    padding: 1.25rem;
    border: 1px solid var(--color-border-soft);
    border-radius: 1.25rem;
    background: rgba(255, 255, 255, 0.72);
  }

  .result-label {
    margin: 0;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-accent-dark);
  }

  textarea {
    width: 100%;
    min-height: 8rem;
    padding: 1rem;
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    resize: vertical;
    background: #fff;
    color: var(--color-text);
    font: inherit;
    line-height: 1.5;
  }
</style>
