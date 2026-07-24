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
  try {
    await importNotes(await file.text())
    emit('changed')
    emit('toast', 'Notes updated')
    emit('close')
  } catch {
    emit('toast', 'Invalid backup file')
  } finally {
    // Reset so picking the same file again fires change
    event.target.value = ''
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

<style scoped>
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--fg);
  outline: none;
  border: none;
}
.button {
  background-color: rgba(0, 0, 0, 0);
}
.container-buttons {
  width: 100%;
  height: 52px;
  background-color: inherit;
}
.button-note {
  position: fixed;
  top: 13px;
}
.right-10 {
  right: 10px;
}
@keyframes slide-top {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
#templatebackup {
  width: 100%;
  height: 100%;
  background-color: var(--bg);
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  z-index: 3;
  top: 0;
  animation: slide-top 0.25s;
}
.container-backup {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}
.container-title {
  display: flex;
  width: 280px;
  font-size: 24px;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 40px;
}
.container-title-buttons {
  display: flex;
  width: 280px;
  justify-content: flex-end;
  position: absolute;
  z-index: 4;
}
.import-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  color: var(--fg);
}
input[type='file'] {
  opacity: 0;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
@media only screen and (min-device-width: 1012px) {
  .icon,
  input[type='file'] {
    cursor: pointer;
  }
}
</style>
