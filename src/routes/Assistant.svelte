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
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
</style>
