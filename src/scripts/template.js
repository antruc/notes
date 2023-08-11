import '../styles/template.css'
import '../styles/buttons.css'
import { html, render } from './renderer.js'

const template = {
  root: document.querySelector('#app'),
  manageNotes() {
    render(
      html`<section id="templatenotes">
        <ul id="notepad"></ul>
        <div class="container-settings">
          <button id="opensettings" class="icon button"></button>
        </div>
        <button id="newnote" class="icon"></button>
      </section>`,
      this.root
    )
  },
  newNote() {
    render(
      html`<section id="templatenew" class="container-app">
        <div class="container-buttons">
          <button
            id="addnote"
            class="icon right-50 button-note button"
          ></button>
          <button
            id="closetemplate"
            class="icon right-10 button-note button"
            data-close="templatenew"
          ></button>
        </div>
        <textarea
          id="areanew"
          class="area-note"
          placeholder="Write note..."
        ></textarea>
      </section>`,
      this.root
    )
  },
  viewNote(id, value) {
    render(
      html`<section id="templateview" class="container-app">
        <div class="container-buttons">
          <button
            id="backtemplate"
            class="icon left-10 button-note button"
            data-close="templateview"
          ></button>
          <button
            id="locknote"
            class="icon right-180 button-note button"
          ></button>
          <button
            id="savenote"
            class="icon right-140 button-note button"
            data-save="${id}"
          ></button>
          <button
            id="downloadnote"
            class="icon right-95 button-note button"
            data-download="${id}"
          ></button>
          <button
            id="copynote"
            class="icon right-50 button-note button-copy"
            data-copy="${id}"
          ></button>
          <button
            id="removenote"
            class="icon right-10 button-note button"
            data-remove="${id}"
          ></button>
        </div>
        <textarea
          id="areaview"
          class="area-note"
          placeholder="Write note..."
          readonly="true"
        >
${value}</textarea
        >
      </section>`,
      this.root
    )
  },
  backupNotes() {
    render(
      html`<section id="templatebackup">
        <div class="container-buttons">
          <button
            id="closetemplate"
            class="icon right-10 button-note button"
            data-close="templatebackup"
          ></button>
        </div>
        <div class="container-backup">
          <div class="container-title">
            <strong>Export Notes</strong>
            <div class="container-title-buttons">
              <button id="exportnotes" class="icon button"></button>
            </div>
          </div>
          <div class="container-title">
            <strong>Import Notes</strong>
            <div class="container-title-buttons">
              <div id="importnotes" class="button">
                <input id="importdata" class="button" type="file" />
              </div>
            </div>
          </div>
        </div>
      </section>`,
      this.root
    )
  }
}

export default template
