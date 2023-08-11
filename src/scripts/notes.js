import '../styles/notes.css'
import storage from './storage.js'
import { html, render } from './renderer.js'

const notes = {
  textLength(value) {
    return value.substring(0, 19).length === 19
      ? value.substring(0, 19) + '...'
      : value.substring(0, 19)
  },
  note(id, value) {
    return html`<li class="note-card" data-note="${id}">
      ${this.textLength(value)}
    </li>`
  },
  addNote(value) {
    let dateId = Date.now()
    storage.addItem(dateId, value)
    let notepadElm = document.querySelector('#notepad')
    render(this.note(dateId, value), notepadElm)
  },
  saveNote(id, value) {
    storage.saveItem(id, value)
    let noteElm = document.querySelector(`[data-note="${id}"]`)
    noteElm.textContent = this.textLength(value)
  },
  removeNote(id) {
    storage.removeItem(id)
    let noteElm = document.querySelector(`[data-note="${id}"]`)
    noteElm.remove()
  },
  exportNotes() {
    return storage.data()
  },
  importNotes(data) {
    storage.importData(data)
    let noteElm = document.querySelector('[data-note]')
    if (noteElm) {
      let notesElm = document.querySelectorAll('[data-note]')
      notesElm.forEach((i) => i.remove())
    }
    this.load()
  },
  noteValue(id) {
    let data = storage.db
    let result = data.find((note) => {
      return note.id === parseInt(id)
    })
    return result.value
  },
  load() {
    if (localStorage.length === 0) {
      storage.saveData()
    } else if (storage.data().length > 2) {
      storage.init()
      let data = storage.db
      let notepadElm = document.querySelector('#notepad')
      data.forEach((i) => render(this.note(i.id, i.value), notepadElm))
    }
  }
}

export default notes
