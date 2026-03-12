<div class="container">
  <Session1 />
</div>

<script>
  import { onMount } from 'svelte'
  import Session1 from '../pages/Index/Session1.svelte'
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
