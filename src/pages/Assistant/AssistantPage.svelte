<script>
  import AssistantForm from './AssistantForm.svelte'
  import Button from '../../components/Button.svelte'
  import { navigateToPath } from '../../lib/url.js'
</script>

<div class="page-overlay">
  <section class="card-shell">
    <header class="card-header">
      <svg class="icon-whatsapp" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.944.556 3.754 1.528 5.29L2 22l4.87-1.272A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.29c-1.503 0-2.98-.403-4.275-1.165l-.307-.183-3.178.835.849-3.097-.201-.322A8.274 8.274 0 0 1 3.618 12c0-4.474 3.526-8.001 8.382-8.001S20.381 7.526 20.381 12s-3.526 8-8.381 8z"/>
      </svg>
      <h1>Gerador de Links</h1>
      <div class="header-action">
        <button class="btn-close" on:click={() => navigateToPath('/')} aria-label="Voltar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    </header>

    <div class="card-content">
      <div class="page-copy">
        <p>
          Preencha os dados abaixo para gerar um link criptografado que conecta automaticamente uma nova instância no ambiente da Evolution API.
        </p>
      </div>

      <AssistantForm />
    </div>
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
    width: min(100%, 36rem);
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
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-accent-dark);
  }

  .card-header h1 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--color-text);
  }

  .header-action {
    margin-left: auto;
  }

  .btn-close {
    background: transparent;
    border: none;
    color: var(--color-text-muted);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    transition: background 0.2s;
  }

  .btn-close:hover {
    background: #f0f2f5;
    color: var(--color-text);
  }

  .btn-close svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  .card-content {
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: var(--color-surface);
  }

  .page-copy p {
    margin: 0;
    font-size: 0.9rem;
    color: var(--color-text-muted);
    line-height: 1.5;
  }
</style>
