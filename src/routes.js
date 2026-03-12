import IndexRoute from './routes/Index.svelte'
import AssistantRoute from './routes/Assistant.svelte'

export const routes = {
  '/': IndexRoute,
  '/assistente': AssistantRoute
}

export default routes
