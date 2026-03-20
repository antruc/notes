import './styles/index.css'
import './scripts/reload.js'
import handler from './scripts/handler.js'
import template from './scripts/template.js'
import notes from './scripts/notes.js'

function app() {
  handler.init()
  template.manageNotes()
  notes.load()
}

document.addEventListener('DOMContentLoaded', app)
