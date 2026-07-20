import { ref } from 'vue'

// module-level singleton, only one form active at a time
export const isDirty = ref(false)

export function confirmLeaveIfDirty() {
  if (!isDirty.value) return true
  const leave = window.confirm(
    'You have unsaved changes. Leave without saving?'
  )
  if (leave) isDirty.value = false
  return leave
}

// Warn on tab close / reload while a form is dirty
export function installUnloadGuard() {
  window.addEventListener('beforeunload', (e) => {
    if (isDirty.value) {
      e.preventDefault()
      e.returnValue = '' // legacy browsers need this to show the prompt
    }
  })
}
