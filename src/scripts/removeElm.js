export default function removeElm(id) {
  document.querySelector(id)?.remove()
  document.querySelector('#templatenotes')?.classList.remove('is-hidden')
}
