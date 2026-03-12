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
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .input {
    width: 100%;
    min-height: 3rem;
    padding: 0.85rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: 0.9rem;
    background: var(--color-input);
    color: var(--color-text);
    font: inherit;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .input::placeholder {
    color: var(--color-text-muted);
  }

  .input:focus {
    outline: none;
    border-color: var(--color-border-focus);
    box-shadow: 0 0 0 4px rgba(196, 138, 92, 0.14);
  }

  .help-text {
    font-size: 0.85rem;
    color: var(--color-text-muted);
  }
</style>
