/* --- Constants --- */

const encoder = new TextEncoder()
const decoder = new TextDecoder()


/* --- Methods --- */

function normalizeBase64Padding (value) {
  const remainder = value.length % 4

  if (remainder === 0) return value

  return `${value}${'='.repeat(4 - remainder)}`
}

function toBinaryString (value) {
  const bytes = encoder.encode(value)

  return Array.from(bytes, function (byte) {
    return String.fromCharCode(byte)
  }).join('')
}

function fromBinaryString (value) {
  const bytes = Uint8Array.from(value, function (char) {
    return char.charCodeAt(0)
  })

  return decoder.decode(bytes)
}

function encryptText (value = '') {
  const text = String(value)
  const base64 = btoa(toBinaryString(text))

  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function decryptText (value = '') {
  try {
    const normalizedValue = String(value)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const binaryString = atob(normalizeBase64Padding(normalizedValue))

    return fromBinaryString(binaryString)
  } catch (error) {
    throw new Error('Não foi possível descriptografar os parâmetros da URL.')
  }
}

function encryptConnectionParams (params = {}) {
  return encryptText(JSON.stringify(params))
}

function decryptConnectionParams (encryptedValue = '') {
  try {
    return JSON.parse(decryptText(encryptedValue))
  } catch (error) {
    throw new Error('Os parâmetros criptografados da URL são inválidos.')
  }
}

/* --- Exports --- */

export {
  encryptText,
  decryptText,
  encryptConnectionParams,
  decryptConnectionParams
}
