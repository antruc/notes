<template>
  <NotesList
    v-if="view === 'list'"
    :notes="notes"
    @open="openNote"
    @new="openNew"
    @settings="view = 'settings'"
  />

  <NoteEditor
    v-else-if="view === 'editor'"
    :note="current"
    @close="closeEditor"
    @toast="showToast"
  />

  <SettingsPanel
    v-else
    @close="view = 'list'"
    @toast="showToast"
    @changed="reload"
  />

  <Toast :message="toastMsg" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NotesList from './views/NotesList.vue'
import NoteEditor from './views/NoteEditor.vue'
import SettingsPanel from './views/SettingsPanel.vue'
import Toast from './components/Toast.vue'
import { getNotes } from './db'

const view = ref('list')
const notes = ref([])
const current = ref(null)
const toastMsg = ref('')
let toastTimer

async function reload() {
  notes.value = await getNotes()
}

function openNote(n) {
  current.value = n
  view.value = 'editor'
}

function openNew() {
  current.value = null
  view.value = 'editor'
}

async function closeEditor() {
  await reload()
  view.value = 'list'
}

function showToast(text) {
  toastMsg.value = text
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toastMsg.value = ''), 1500)
}

onMounted(reload)
</script>
