import { html, render } from './renderer.js'

const template = {
  root: document.querySelector('#app'),
  manageNotes() {
    render(
      html`<section id="templatenotes">
        <ul id="notepad"></ul>
        <div class="container-settings">
          <button id="opensettings" class="icon button button-settings hn hn-cog-solid"></button>
        </div>
        <button id="newnote" class="icon hn hn-plus-solid"></button>
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
            class="icon right-50 button-note button hn hn-save-solid"
          ></button>
          <button
            id="closetemplate"
            class="icon right-10 button-note button hn hn-times-solid"
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
            class="icon left-10 button-note button  hn hn-arrow-left-solid"
            data-close="templateview"
          ></button>
          <button
            id="locknote"
            class="icon right-170 button-note button hn hn-lock-solid"
          ></button>
          <button
            id="savenote"
            class="icon right-130 button-note button hn hn-save-solid"
            data-save="${id}"
          ></button>
          <button
            id="downloadnote"
            class="icon right-90 button-note button hn hn-download-solid"
            data-download="${id}"
          ></button>
          <button
            id="copynote"
            class="icon right-50 button-note button hn hn-copy-solid"
            data-copy="${id}"
          ></button>
          <button
            id="removenote"
            class="icon right-10 button-note button hn hn-trash-alt-solid"
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
            class="icon right-10 button-note button hn hn-times-solid"
            data-close="templatebackup"
          ></button>
        </div>
        <div class="container-backup">
          <div class="container-title">
            Export Notes
            <div class="container-title-buttons">
              <button id="exportnotes" class="icon button hn hn-download-solid"></button>
            </div>
          </div>
          <div class="container-title">
            Import Notes
            <div class="container-title-buttons">
              <div id="importnotes" class="button hn hn-upload-solid">
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
