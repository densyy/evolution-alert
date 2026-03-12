<script>
  export let src = ''
  export let loading = false
  export let errorMessage = ''
  export let title = 'QR code do WhatsApp'
  export let description = 'Escaneie o código abaixo para concluir a conexão.'
</script>

<section class="qr-card">
  <div class="qr-copy">
    <p class="eyebrow">Evolution API</p>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>

  {#if loading}
    <div class="qr-state">
      <div class="loader" aria-hidden="true"></div>
      <span>Gerando QR code...</span>
    </div>
  {:else if errorMessage}
    <div class="qr-state qr-state--error">
      <span>{errorMessage}</span>
    </div>
  {:else if src}
    <div class="qr-image-wrapper">
      <img class="qr-image" src={src} alt="QR code para autenticação do WhatsApp">
    </div>
  {:else}
    <div class="qr-state">
      <span>Nenhum QR code disponível no momento.</span>
    </div>
  {/if}
</section>

<style>
  .qr-card {
    display: grid;
    gap: 1.5rem;
    padding: 1.5rem;
    border: 1px solid var(--color-border-soft);
    border-radius: 1.5rem;
    background: var(--color-surface);
    box-shadow: 0 20px 50px rgba(61, 40, 23, 0.08);
  }

  .qr-copy {
    display: grid;
    gap: 0.5rem;
  }

  .qr-copy h2 {
    margin: 0;
    font-size: clamp(1.6rem, 4vw, 2.2rem);
  }

  .qr-copy p {
    margin: 0;
    color: var(--color-text-muted);
    line-height: 1.6;
  }

  .eyebrow {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-accent-dark);
  }

  .qr-image-wrapper,
  .qr-state {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 20rem;
    padding: 1.5rem;
    border-radius: 1.25rem;
    background: #fff;
    border: 1px dashed var(--color-border);
  }

  .qr-state {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    color: var(--color-text-muted);
  }

  .qr-state--error {
    color: var(--color-danger);
    border-color: rgba(187, 82, 59, 0.35);
    background: rgba(187, 82, 59, 0.06);
  }

  .qr-image {
    width: min(100%, 22rem);
    aspect-ratio: 1;
    object-fit: contain;
  }

  .loader {
    width: 2.4rem;
    height: 2.4rem;
    border: 3px solid rgba(196, 138, 92, 0.2);
    border-top-color: var(--color-accent);
    border-radius: 999px;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
