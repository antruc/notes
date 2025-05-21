import toast from './toast.js'
import template from './template.js'
import notes from './notes.js'
import removeElm from './removeElm.js'
import { saveAs } from 'file-saver'
import copyToClipboard from './copyToClipboard.js'

const handler = {
  onClick(event) {
    let matchNew = event.target.matches('#newnote')
    let matchAdd = event.target.matches('#addnote')
    let dataNote = event.target.dataset.note
    let matchLock = event.target.matches('#locknote')
    let dataSave = event.target.dataset.save
    let dataDownload = event.target.dataset.download
    let dataCopy = event.target.dataset.copy
    let dataRemove = event.target.dataset.remove
    let dataClose = event.target.dataset.close
    let matchSettings = event.target.matches('#opensettings')
    let matchExport = event.target.matches('#exportnotes')
    let viewElm = document.querySelector('#templateview')
    let backupElm = document.querySelector('#templatebackup')
    let notesElm = document.querySelector('#templatenotes')
    let newElm = document.querySelector('#templatenew')
    if (matchNew) {
      if (!viewElm && !backupElm) {
        notesElm.classList.add('is-hidden')
        template.newNote()
        let textAreaNew = document.querySelector('#areanew')
        textAreaNew.focus()
      }
    }
    if (matchAdd) {
      let textAreaNew = document.querySelector('#areanew')
      if (textAreaNew.value.length > 0) {
        notes.addNote(textAreaNew.value)
        removeElm('#templatenew')
        toast.show('Note added')
      } else {
        removeElm('#templatenew')
      }
    }
    if (dataNote) {
      if (!newElm && !backupElm) {
        notesElm.classList.add('is-hidden')
        let value = notes.noteValue(dataNote)
        template.viewNote(dataNote, value)
      }
    }
    if (matchLock) {
      let textAreaView = document.querySelector('#areaview')
      if (textAreaView.hasAttribute('readonly')) {
        textAreaView.removeAttribute('readonly')
        let textLenght = textAreaView.value.length
        textAreaView.focus()
        textAreaView.setSelectionRange(textLenght, textLenght)
        textAreaView.scrollTop = textAreaView.scrollHeight
      } else {
        textAreaView.setAttribute('readonly', true)
      }
      let buttonLock = document.querySelector('#locknote')
      buttonLock.classList.toggle('is-unlock')
    }
    if (dataSave) {
      let textAreaView = document.querySelector('#areaview')
      if (textAreaView.value.length > 0) {
        notes.saveNote(dataSave, textAreaView.value)
        removeElm('#templateview')
        toast.show('Note saved')
      } else {
        notes.removeNote(dataSave)
        removeElm('#templateview')
        toast.show('Note deleted')
      }
    }
    if (dataDownload) {
      let note = notes.noteValue(dataDownload)
      let blob = new Blob([note], {
        type: 'text/plain;charset=utf-8'
      })
      saveAs(blob, `${dataDownload}.txt`)
    }
    if (dataCopy) {
      let note = notes.noteValue(dataCopy)
      copyToClipboard(note)
      toast.show('Copied to clipboard')
    }
    if (dataRemove) {
      notes.removeNote(dataRemove)
      removeElm('#templateview')
      toast.show('Note deleted')
    }
    if (dataClose) {
      removeElm(`#${dataClose}`)
    }
    if (matchSettings) {
      notesElm.classList.add('is-hidden')
      template.backupNotes()
    }
    if (matchExport) {
      let data = notes.exportNotes()
      let blob = new Blob([data], {
        type: 'application/json;charset=utf-8'
      })
      saveAs(blob, 'notes.json')
    }
  },
  onChange(event) {
    let matchImport = event.target.matches('#importdata')
    if (matchImport) {
      let inputImport = document.querySelector('#importdata')
      let file = inputImport.files[0]
      let reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        if (file.type === 'application/json') {
          if (reader.result.includes('{')) {
            try {
              notes.importNotes(reader.result)
              removeElm('#templatebackup')
              toast.show('Notes updated')
            } catch (error) {
              if (error) {
                toast.show('Error with database')
                notes.reset()
              }
            }
          } else {
            toast.show('Error with database')
          }
        } else {
          toast.show('File not compatible')
        }
      }
    }
  }
}

export default handler
