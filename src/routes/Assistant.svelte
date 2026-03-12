<div class="container">
  <AssistantPage />
</div>

<script>
  import { onMount } from 'svelte'
  import AssistantPage from '../pages/Assistant/AssistantPage.svelte'
  import { mountNoDrag } from '../lib/noDrag.js'

  onMount(() => mountNoDrag(document.body))
</script>

<style>
  .container {
    width: 100%;
    min-height: 100vh;
    padding: 2rem 1.25rem 4rem;
    overflow-y: auto;
  }

  @media (min-width: 768px) {
    .container {
      padding: 3rem 1.5rem 5rem;
    }
  }
</style>
