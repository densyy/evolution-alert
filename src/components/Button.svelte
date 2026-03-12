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
    gap: 0.6rem;
    min-height: 3rem;
    padding: 0.85rem 1.2rem;
    border: 1px solid transparent;
    border-radius: 999px;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
  }

  .button:hover:enabled {
    transform: translateY(-1px);
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
    background: transparent;
    color: var(--color-text);
    border-color: var(--color-border);
  }

  .button--secondary:hover:enabled {
    background: rgba(168, 123, 91, 0.08);
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
