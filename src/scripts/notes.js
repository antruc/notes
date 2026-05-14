import storage from './storage.js'
import { html, render } from './renderer.js'

const notes = {
  textLength(value) {
    // Truncate the text to 19 characters and then added an ellipsis if necessary
    return value.length >= 19
      ? value.substring(0, 19) + '...'
      : value.substring(0, 19)
  },
  note(id, value) {
    return html`<li class="note-card" data-note="${id}">
      ${this.textLength(value)}
    </li>`
  },
  addNote(value) {
    const dateId = Date.now()
    storage.addItem(dateId, value)
    render(this.note(dateId, value), document.querySelector('#notepad'))
  },
  saveNote(id, value) {
    storage.saveItem(id, value)
    document.querySelector(`[data-note="${id}"]`).textContent =
      this.textLength(value)
  },
  removeNote(id) {
    storage.removeItem(id)
    document.querySelector(`[data-note="${id}"]`).remove()
  },
  exportNotes() {
    return storage.data()
  },
  importNotes(data) {
    storage.importData(data)
    if (!document.querySelector('[data-note]')) return
    document.querySelectorAll('[data-note]').forEach((i) => i.remove())
    this.load()
  },
  noteValue(id) {
    const result = storage.db.find((note) => {
      return note.id === Number(id)
    })
    return result.value
  },
  load() {
    if (localStorage.length === 0) {
      this.init()
    } else if (storage.data().length > 2) {
      storage.init()
      storage.db.forEach((i) =>
        render(this.note(i.id, i.value), document.querySelector('#notepad'))
      )
    }
  },
  init() {
    storage.saveData()
  }
}

export default notes
