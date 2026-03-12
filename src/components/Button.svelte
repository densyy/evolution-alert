<script>
  export let type = 'button'
  export let variant = 'primary'
  export let loading = false
  export let disabled = false
  export let fullWidth = false

  $: isDisabled = disabled || loading
</script>

<button
  class={`button button--${variant} ${fullWidth ? 'button--full-width' : ''}`}
  {type}
  disabled={isDisabled}
  aria-busy={loading}
  on:click
>
  {#if loading}
    <span class="spinner" aria-hidden="true"></span>
  {/if}
  <span><slot /></span>
</button>

<style>
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 2.5rem;
    padding: 0.5rem 1.25rem;
    border: 1px solid transparent;
    border-radius: 9999px;
    font: inherit;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
  }

  .button:hover:enabled {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .button:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  .button--primary {
    background: var(--color-accent);
    color: #fff;
  }

  .button--primary:hover:enabled {
    background: var(--color-accent-dark);
  }

  .button--secondary {
    background: #fff;
    color: var(--color-accent-dark);
    border-color: #d1d7db;
  }

  .button--secondary:hover:enabled {
    background: #f8f9fa;
  }

  .button--full-width {
    width: 100%;
  }

  .spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.35);
    border-top-color: currentColor;
    border-radius: 999px;
    animation: spin 0.8s linear infinite;
  }

  .button--secondary .spinner {
    border-color: rgba(61, 40, 23, 0.2);
    border-top-color: currentColor;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
