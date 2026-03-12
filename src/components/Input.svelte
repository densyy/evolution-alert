<script>
  export let id = ''
  export let label = ''
  export let type = 'text'
  export let value = ''
  export let placeholder = ''
  export let autocomplete = 'off'
  export let required = false
  export let helpText = ''
</script>

<label class="field" for={id}>
  <span class="label">{label}</span>
  <input
    class="input"
    {id}
    {type}
    bind:value
    {placeholder}
    {autocomplete}
    {required}
  >
  {#if helpText}
    <span class="help-text">{helpText}</span>
  {/if}
</label>

<style>
  .field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  .label {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--color-text-muted);
  }

  .input {
    width: 100%;
    min-height: 2.5rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    background: #fff;
    color: var(--color-text);
    font: inherit;
    font-size: 0.9rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .input::placeholder {
    color: #a0aab0;
  }

  .input:focus {
    outline: none;
    border-color: var(--color-border-focus);
    box-shadow: 0 0 0 2px rgba(18, 140, 126, 0.15);
  }

  .help-text {
    font-size: 0.8rem;
    color: #a0aab0;
  }
</style>
