import { wrap } from 'svelte-spa-router/wrap'

export const routes = {
  '/': wrap({ asyncComponent: () => import('./routes/Index.svelte') }),
}

export default routes
