/* --- Imports --- */

import axios from 'axios'

/* --- Constants --- */

const REQUEST_TIMEOUT_IN_MS = 15000

/* --- Methods --- */

function getApiKeyHeaders (apiKey) {
  return { apiKey }
}

function normalizeDomain (domain = '') {
  return String(domain)
    .trim()
    .replace(/\/+$/g, '')
}

function createEvolutionUrl (domain, path) {
  const normalizedDomain = normalizeDomain(domain)

  if (!normalizedDomain) {
    throw new Error('Domínio do Evolution API não informado.')
  }

  if (/^https?:\/\//i.test(normalizedDomain)) {
    return `${normalizedDomain}${path}`
  }

  return `https://${normalizedDomain}${path}`
}

function getErrorMessage (error, fallbackMessage) {
  const apiMessage = error?.response?.data?.message || error?.response?.data?.error

  return apiMessage || error?.message || fallbackMessage
}

async function checkConnectionState (domain, instance, token) {
  try {
    const url = createEvolutionUrl(domain, `/instance/connectionState/${instance}`)
    const response = await axios.get(url, {
      headers: getApiKeyHeaders(token),
      timeout: REQUEST_TIMEOUT_IN_MS
    })

    return {
      instanceName: response?.data?.instance?.instanceName || instance,
      state: String(response?.data?.instance?.state || '').toLowerCase()
    }
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Não foi possível verificar o status da conexão.'))
  }
}

async function getQrCodeBase64 (domain, instance, number, globalApiKey) {
  try {
    const url = createEvolutionUrl(domain, `/instance/connect/${instance}`)
    const response = await axios.get(url, {
      headers: getApiKeyHeaders(globalApiKey),
      params: { number },
      timeout: REQUEST_TIMEOUT_IN_MS
    })

    return String(response?.data?.base64 || '').trim()
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Não foi possível gerar o QR code.'))
  }
}

/* --- Exports --- */

export {
  checkConnectionState,
  getQrCodeBase64
}
