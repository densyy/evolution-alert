/* --- Methods --- */

function normalizeQrCodeBase64 (value = '') {
  const normalizedValue = String(value || '').trim()

  if (!normalizedValue) return ''
  if (normalizedValue.startsWith('data:image')) return normalizedValue

  return `data:image/png;base64,${normalizedValue}`
}

function hasQrCodeBase64 (value = '') {
  return Boolean(normalizeQrCodeBase64(value))
}

/* --- Exports --- */

export {
  normalizeQrCodeBase64,
  hasQrCodeBase64
}
