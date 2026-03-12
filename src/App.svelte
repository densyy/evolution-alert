<script>
  import { onMount } from 'svelte'
  import routes from './routes.js'
  import { getCurrentPath } from './lib/url.js'

  let currentPath = getCurrentPath()

  const updateRoute = () => {
    currentPath = getCurrentPath()
  }

  onMount(() => {
    updateRoute()
    window.addEventListener('popstate', updateRoute)

    return () => window.removeEventListener('popstate', updateRoute)
  })

  $: CurrentRoute = routes[currentPath] || routes['/']
</script>

<main class="content">
  <svelte:component this={CurrentRoute} />
</main>

<style>
  @import '../public/global.css';

  .content {
    width: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
