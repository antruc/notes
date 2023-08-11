export default function removeElm(id) {
  let elm = document.querySelector(id)
  elm.remove()
  let notesElm = document.querySelector('#templatenotes')
  notesElm.classList.remove('is-hidden')
}
