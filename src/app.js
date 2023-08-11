import './styles/index.css'
import './scripts/reload.js'
import onEvent from './scripts/onEvent.js'
import handler from './scripts/handler.js'
import template from './scripts/template.js'
import notes from './scripts/notes.js'

function app() {
  onEvent('click', handler.onClick)
  onEvent('change', handler.onChange)
  template.manageNotes()
  notes.load()
}

onEvent('DOMContentLoaded', app)
