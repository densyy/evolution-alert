/* --- Imports --- */

import { decryptConnectionParams, encryptConnectionParams } from './crypto.js'

/* --- Constants --- */

const REQUIRED_CONNECTION_PARAM_NAMES = [
  'domain',
  'instance',
  'number',
  'token',
  'globalApiKey'
]

/* --- Methods --- */

function normalizePathname (pathname = '/') {
  const cleanPathname = String(pathname || '/').trim()

  if (!cleanPathname || cleanPathname === '/') return '/'

  return cleanPathname.endsWith('/')
    ? cleanPathname.slice(0, -1)
    : cleanPathname
}

function getCurrentPath () {
  if (typeof window === 'undefined') return '/'

  return normalizePathname(window.location.pathname)
}

function normalizeConnectionParams (params = {}) {
  return REQUIRED_CONNECTION_PARAM_NAMES.reduce(function (accumulator, key) {
    accumulator[key] = String(params[key] || '').trim()
    return accumulator
  }, {})
}

function hasRequiredConnectionParams (params = {}) {
  const normalizedParams = normalizeConnectionParams(params)

  return REQUIRED_CONNECTION_PARAM_NAMES.every(function (key) {
    return Boolean(normalizedParams[key])
  })
}

function getEncryptedConnectionParams (search = '') {
  const queryString = typeof search === 'string'
    ? search
    : window.location.search

  const searchParams = new URLSearchParams(queryString)

  return searchParams.get('params') || ''
}

function getConnectionParamsFromSearch (search = '') {
  const encryptedParams = getEncryptedConnectionParams(search)

  if (!encryptedParams) return null

  return normalizeConnectionParams(decryptConnectionParams(encryptedParams))
}

function buildConnectionUrl ({ path = '/', params, origin = '' } = {}) {
  const baseOrigin = origin || (typeof window !== 'undefined' ? window.location.origin : '')
  const url = new URL(normalizePathname(path), baseOrigin)

  url.searchParams.set('params', encryptConnectionParams(normalizeConnectionParams(params)))

  return url.toString()
}

function navigateToPath (path = '/') {
  if (typeof window === 'undefined') return

  const nextPath = normalizePathname(path)

  if (getCurrentPath() === nextPath) return

  window.history.pushState({}, '', nextPath)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

/* --- Exports --- */

export {
  REQUIRED_CONNECTION_PARAM_NAMES,
  normalizePathname,
  getCurrentPath,
  normalizeConnectionParams,
  hasRequiredConnectionParams,
  getEncryptedConnectionParams,
  getConnectionParamsFromSearch,
  buildConnectionUrl,
  navigateToPath
}
