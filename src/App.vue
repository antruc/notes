<template>
  <section v-if="view === 'list'" id="templatenotes">
    <ul id="notepad">
      <li v-for="n in notes" :key="n.id" class="note-card" @click="openNote(n)">
        {{ preview(n.value) }}
      </li>
    </ul>
    <div class="container-settings">
      <button
        id="opensettings"
        class="icon button"
        aria-label="Settings"
        @click="view = 'settings'"
      >
        <Settings :size="26" />
      </button>
    </div>
    <button id="newnote" class="icon" aria-label="New note" @click="openNew">
      <Plus :size="28" />
    </button>
  </section>

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

  <div v-if="toastMsg" class="container-toast">
    <div class="toast">{{ toastMsg }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Plus, Settings } from '@lucide/vue'
import NoteEditor from './views/NoteEditor.vue'
import SettingsPanel from './views/SettingsPanel.vue'
import { getNotes } from './db'

const view = ref('list')
const notes = ref([])
const current = ref(null)
const toastMsg = ref('')
let toastTimer

function preview(value) {
  return value.length >= 15 ? value.substring(0, 15) + '...' : value
}

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
