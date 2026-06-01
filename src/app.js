import handler from './js/handler.js'
import template from './js/template.js'
import notes from './js/notes.js'

function app() {
  handler.init()
  template.manageNotes()
  notes.load()
}

document.addEventListener('DOMContentLoaded', app)
