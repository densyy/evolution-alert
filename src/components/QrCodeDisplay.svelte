<script>
  export let src = ''
  export let loading = false
  export let errorMessage = ''
  export let title = 'Escaneie o QR Code'
  export let description = 'Abra o WhatsApp no seu celular e escaneie o código para conectar.'
</script>

<div class="qr-container">
  <div class="qr-content">
    <div class="qr-text">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>

    <div class="qr-box">
      {#if loading}
        <div class="qr-state">
          <div class="loader" aria-hidden="true"></div>
          <span>Gerando código...</span>
        </div>
      {:else if errorMessage}
        <div class="qr-state qr-state--error">
          <svg viewBox="0 0 24 24" class="icon-error" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <span>{errorMessage}</span>
        </div>
      {:else if src}
        <div class="qr-image-wrapper">
          <img class="qr-image" src={src} alt="QR code para autenticação do WhatsApp">
        </div>
      {:else}
        <div class="qr-state">
          <span>Nenhum código disponível.</span>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .qr-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .qr-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
  }

  .qr-text {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .qr-text h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--color-text);
  }

  .qr-text p {
    margin: 0;
    font-size: 0.9rem;
    color: var(--color-text-muted);
    line-height: 1.5;
    max-width: 20rem;
  }

  .qr-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16.5rem;
    height: 16.5rem;
    padding: 1rem;
    background: #fff;
    border-radius: 0.75rem;
    box-shadow: 0 2px 8px rgba(11, 20, 26, 0.05);
    border: 1px solid var(--color-border-soft);
  }

  .qr-image-wrapper,
  .qr-state {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: black;
  }

  .qr-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: black;
  }

  .qr-state {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }

  .icon-error {
    width: 2rem;
    height: 2rem;
    color: var(--color-danger);
  }

  .loader {
    width: 1.75rem;
    height: 1.75rem;
    border: 2px solid rgba(18, 140, 126, 0.2);
    border-top-color: var(--color-accent-dark);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
