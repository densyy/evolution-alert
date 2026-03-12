/* --- Constants --- */
const STORAGE_KEY_ASSISTANT_FORM = 'evolution-alert:assistant-form'

/* --- Methods --- */
function canAccessLocalStorage () {
  try {
    const testKey = '__localStorage_test__'
    localStorage.setItem(testKey, 'test')
    localStorage.removeItem(testKey)
    return true
  } catch (error) {
    return false
  }
}

function saveAssistantFormData (data = {}) {
  if (!canAccessLocalStorage()) return false

  try {
    const serialized = JSON.stringify(data)
    localStorage.setItem(STORAGE_KEY_ASSISTANT_FORM, serialized)
    return true
  } catch (error) {
    return false
  }
}

function loadAssistantFormData () {
  if (!canAccessLocalStorage()) return null

  try {
    const serialized = localStorage.getItem(STORAGE_KEY_ASSISTANT_FORM)
    if (!serialized) return null
    return JSON.parse(serialized)
  } catch (error) {
    return null
  }
}

function clearAssistantFormData () {
  if (!canAccessLocalStorage()) return false

  try {
    localStorage.removeItem(STORAGE_KEY_ASSISTANT_FORM)
    return true
  } catch (error) {
    return false
  }
}

/* --- Exports --- */
export {
  saveAssistantFormData,
  loadAssistantFormData,
  clearAssistantFormData
}
