<template>
  <section id="templatebackup">
    <div class="container-buttons">
      <button
        class="icon right-10 button-note button"
        aria-label="Close"
        @click="$emit('close')"
      >
        <X :size="24" />
      </button>
    </div>
    <div class="container-backup">
      <div class="container-title">
        Export Notes
        <div class="container-title-buttons">
          <button class="icon button" aria-label="Export" @click="exportAll">
            <Download :size="24" />
          </button>
        </div>
      </div>
      <div class="container-title">
        Import Notes
        <div class="container-title-buttons">
          <div class="button import-button">
            <Upload :size="24" />
            <input
              type="file"
              accept="application/json"
              aria-label="Import"
              @change="importFile"
            />
          </div>
        </div>
      </div>
      <div class="container-title">
        Delete All
        <div class="container-title-buttons">
          <button class="icon button" aria-label="Delete all" @click="wipe">
            <Trash2 :size="24" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { X, Download, Upload, Trash2 } from '@lucide/vue'
import { exportNotes, importNotes, deleteAll } from '../db'
import downloadBlob from '../utils/download.js'

const emit = defineEmits(['close', 'toast', 'changed'])

async function exportAll() {
  downloadBlob(
    await exportNotes(),
    'application/json;charset=utf-8',
    'notes.json'
  )
}

// Merge import: keeps current notes, overwrites only matching ids
async function importFile(event) {
  const file = event.target.files[0]
  if (!file) return
  if (file.type !== 'application/json') {
    emit('toast', 'File not compatible')
    return
  }
  try {
    await importNotes(await file.text())
    emit('changed')
    emit('toast', 'Notes updated')
    emit('close')
  } catch {
    emit('toast', 'Error with database')
  }
}

// Double confirm before wiping
async function wipe() {
  if (!window.confirm('Delete all notes?')) return
  if (!window.confirm('This action is permanent. Confirm?')) return
  await deleteAll()
  emit('changed')
  emit('toast', 'All notes deleted')
  emit('close')
}
</script>
