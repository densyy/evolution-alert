<script>
  import AssistantForm from './AssistantForm.svelte'
  import Button from '../../components/Button.svelte'
  import { navigateToPath } from '../../lib/url.js'
</script>

<section class="page-shell">
  <div class="page-copy">
    <p class="eyebrow">Assistente de links</p>
    <h1>Monte a URL criptografada da conexão</h1>
    <p>
      Preencha os dados da instância para gerar uma URL pronta para uso na rota principal.
      Os valores serão serializados e criptografados em base64 para trafegar pela URL.
    </p>
  </div>

  <div class="page-actions">
    <Button variant="secondary" on:click={() => navigateToPath('/')}>Voltar para a rota inicial</Button>
  </div>

  <AssistantForm />
</section>

<style>
  .page-shell {
    width: min(100%, 56rem);
    margin: 0 auto;
    display: grid;
    gap: 2rem;
  }

  .page-copy {
    display: grid;
    gap: 0.75rem;
  }

  .page-copy h1,
  .page-copy p {
    margin: 0;
  }

  .page-copy h1 {
    font-size: clamp(2rem, 5vw, 3.25rem);
    line-height: 1.05;
  }

  .page-copy p {
    color: var(--color-text-muted);
    line-height: 1.6;
  }

  .page-actions {
    display: flex;
    justify-content: flex-start;
  }

  .eyebrow {
    margin: 0;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-accent-dark);
  }
</style>
