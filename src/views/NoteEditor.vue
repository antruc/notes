<template>
  <section id="templateeditor" class="container-app">
    <div class="container-buttons">
      <template v-if="isNew">
        <button
          class="icon left-10 button-note button"
          aria-label="Close"
          @click="close"
        >
          <ArrowLeft :size="24" />
        </button>
        <button
          class="icon right-10 button-note button"
          aria-label="Save"
          @click="saveNew"
        >
          <Save :size="24" />
        </button>
      </template>
      <template v-else>
        <button
          class="icon left-10 button-note button"
          aria-label="Back"
          @click="close"
        >
          <ArrowLeft :size="24" />
        </button>
        <button
          class="icon right-170 button-note button"
          aria-label="Toggle edit"
          @click="toggleLock"
        >
          <Lock v-if="locked" :size="24" />
          <LockOpen v-else :size="24" />
        </button>
        <button
          class="icon right-130 button-note button"
          aria-label="Save"
          @click="saveExisting"
        >
          <Save :size="24" />
        </button>
        <button
          class="icon right-90 button-note button"
          aria-label="Download"
          @click="download"
        >
          <Download :size="24" />
        </button>
        <button
          class="icon right-50 button-note button"
          aria-label="Copy"
          @click="copy"
        >
          <Copy :size="24" />
        </button>
        <button
          class="icon right-10 button-note button"
          aria-label="Delete"
          @click="remove"
        >
          <Trash2 :size="24" />
        </button>
      </template>
    </div>
    <textarea
      ref="area"
      v-model="value"
      class="area-note"
      placeholder="Write note..."
      :readonly="locked"
    ></textarea>
  </section>
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick } from 'vue'
import {
  ArrowLeft,
  Lock,
  LockOpen,
  Save,
  Download,
  Copy,
  Trash2
} from '@lucide/vue'
import { addNote, saveNote, removeNote } from '../db'
import { isDirty, confirmLeaveIfDirty } from '../composables/useDirtyGuard.js'
import downloadBlob from '../utils/download.js'

const props = defineProps({
  note: { type: Object, default: null }
})
const emit = defineEmits(['close', 'toast'])

const isNew = computed(() => !props.note)
const value = ref(props.note?.value ?? '')
const locked = ref(!isNew.value)
const area = ref(null)

watch(value, (v) => {
  isDirty.value = isNew.value ? v.length > 0 : v !== props.note.value
})

onMounted(() => {
  if (isNew.value) area.value.focus()
})

function done(msg) {
  isDirty.value = false
  if (msg) emit('toast', msg)
  emit('close')
}

function close() {
  if (!confirmLeaveIfDirty()) return
  emit('close')
}

async function saveNew() {
  if (value.value.length === 0) return done()
  await addNote(Date.now(), value.value)
  done('Note added')
}

async function saveExisting() {
  if (value.value.length === 0) {
    await removeNote(props.note.id)
    return done('Note deleted')
  }
  await saveNote(props.note.id, value.value)
  done('Note updated')
}

async function toggleLock() {
  locked.value = !locked.value
  if (!locked.value) {
    await nextTick()
    const elm = area.value
    const end = elm.value.length
    elm.focus()
    elm.setSelectionRange(end, end)
    elm.scrollTop = elm.scrollHeight
  }
}

function download() {
  downloadBlob(value.value, 'text/plain;charset=utf-8', `${props.note.id}.txt`)
}

async function copy() {
  try {
    await navigator.clipboard.writeText(value.value)
    emit('toast', 'Note copied')
  } catch {
    emit('toast', 'There was an error')
  }
}

async function remove() {
  if (!window.confirm('Delete this note?')) return
  await removeNote(props.note.id)
  done('Note deleted')
}
</script>
