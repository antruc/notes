var e=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function t(e,...t){let n=``;return e.forEach((e,r)=>{n+=e+(t[r]||``)}),n}function n(e,t){t.insertAdjacentHTML(`afterbegin`,e)}var r={template(e){return t`<div class="container-toast">
      <div class="toast">${e}</div>
    </div>`},show(e){n(this.template(e),document.querySelector(`#app`)),setTimeout(()=>document.querySelector(`.container-toast`).remove(),1500)}},i={root:document.querySelector(`#app`),manageNotes(){n(t`<section id="templatenotes">
        <ul id="notepad"></ul>
        <div class="container-settings">
          <button id="opensettings" class="icon button"></button>
        </div>
        <button id="newnote" class="icon"></button>
      </section>`,this.root)},newNote(){n(t`<section id="templatenew" class="container-app">
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
      </section>`,this.root)},viewNote(e,r){n(t`<section id="templateview" class="container-app">
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
            data-save="${e}"
          ></button>
          <button
            id="downloadnote"
            class="icon right-95 button-note button"
            data-download="${e}"
          ></button>
          <button
            id="copynote"
            class="icon right-50 button-note button-copy"
            data-copy="${e}"
          ></button>
          <button
            id="removenote"
            class="icon right-10 button-note button"
            data-remove="${e}"
          ></button>
        </div>
        <textarea
          id="areaview"
          class="area-note"
          placeholder="Write note..."
          readonly="true"
        >
${r}</textarea
        >
      </section>`,this.root)},backupNotes(){n(t`<section id="templatebackup">
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
      </section>`,this.root)}},a={db:[],data(){return localStorage.getItem(`db`)},addItem(e,t){this.db.push({id:Number(e),value:t}),this.saveData()},saveItem(e,t){let n=this.db.findIndex(t=>t.id===Number(e));this.db[n].value=t,this.saveData()},removeItem(e){let t=this.db.filter(t=>t.id!==Number(e));this.db=[],t.forEach(e=>this.db.push(e)),this.saveData()},saveData(){let e=JSON.stringify(this.db);localStorage.setItem(`db`,e)},importData(e){localStorage.setItem(`db`,e)},init(){let e=this.data();this.db=JSON.parse(e)}},o={textLength(e){return e.length>=19?e.substring(0,19)+`...`:e.substring(0,19)},note(e,n){return t`<li class="note-card" data-note="${e}">
      ${this.textLength(n)}
    </li>`},addNote(e){let t=Date.now();a.addItem(t,e),n(this.note(t,e),document.querySelector(`#notepad`))},saveNote(e,t){a.saveItem(e,t),document.querySelector(`[data-note="${e}"]`).textContent=this.textLength(t)},removeNote(e){a.removeItem(e),document.querySelector(`[data-note="${e}"]`).remove()},exportNotes(){return a.data()},importNotes(e){a.importData(e),document.querySelector(`[data-note]`)&&(document.querySelectorAll(`[data-note]`).forEach(e=>e.remove()),this.load())},noteValue(e){return a.db.find(t=>t.id===Number(e)).value},load(){localStorage.length===0?this.init():a.data().length>2&&(a.init(),a.db.forEach(e=>n(this.note(e.id,e.value),document.querySelector(`#notepad`))))},init(){a.saveData()}};function s(e){document.querySelector(e)?.remove(),document.querySelector(`#templatenotes`).classList.remove(`is-hidden`)}var c=e(((e,t)=>{(function(t,n){typeof define==`function`&&define.amd?define([],n):e===void 0?(n(),t.FileSaver={exports:{}}.exports):n()})(e,function(){function e(e,t){return t===void 0?t={autoBom:!1}:typeof t!=`object`&&(console.warn(`Deprecated: Expected third argument to be a object`),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob([`﻿`,e],{type:e.type}):e}function n(e,t,n){var r=new XMLHttpRequest;r.open(`GET`,e),r.responseType=`blob`,r.onload=function(){s(r.response,t,n)},r.onerror=function(){console.error(`could not download file`)},r.send()}function r(e){var t=new XMLHttpRequest;t.open(`HEAD`,e,!1);try{t.send()}catch{}return 200<=t.status&&299>=t.status}function i(e){try{e.dispatchEvent(new MouseEvent(`click`))}catch{var t=document.createEvent(`MouseEvents`);t.initMouseEvent(`click`,!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var a=typeof window==`object`&&window.window===window?window:typeof self==`object`&&self.self===self?self:typeof global==`object`&&global.global===global?global:void 0,o=a.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),s=a.saveAs||(typeof window!=`object`||window!==a?function(){}:`download`in HTMLAnchorElement.prototype&&!o?function(e,t,o){var s=a.URL||a.webkitURL,c=document.createElement(`a`);t=t||e.name||`download`,c.download=t,c.rel=`noopener`,typeof e==`string`?(c.href=e,c.origin===location.origin?i(c):r(c.href)?n(e,t,o):i(c,c.target=`_blank`)):(c.href=s.createObjectURL(e),setTimeout(function(){s.revokeObjectURL(c.href)},4e4),setTimeout(function(){i(c)},0))}:`msSaveOrOpenBlob`in navigator?function(t,a,o){if(a=a||t.name||`download`,typeof t!=`string`)navigator.msSaveOrOpenBlob(e(t,o),a);else if(r(t))n(t,a,o);else{var s=document.createElement(`a`);s.href=t,s.target=`_blank`,setTimeout(function(){i(s)})}}:function(e,t,r,i){if(i||=open(``,`_blank`),i&&(i.document.title=i.document.body.innerText=`downloading...`),typeof e==`string`)return n(e,t,r);var s=e.type===`application/octet-stream`,c=/constructor/i.test(a.HTMLElement)||a.safari,l=/CriOS\/[\d]+/.test(navigator.userAgent);if((l||s&&c||o)&&typeof FileReader<`u`){var u=new FileReader;u.onloadend=function(){var e=u.result;e=l?e:e.replace(/^data:[^;]*;/,`data:attachment/file;`),i?i.location.href=e:location=e,i=null},u.readAsDataURL(e)}else{var d=a.URL||a.webkitURL,f=d.createObjectURL(e);i?i.location=f:location.href=f,i=null,setTimeout(function(){d.revokeObjectURL(f)},4e4)}});a.saveAs=s.saveAs=s,t!==void 0&&(t.exports=s)})}))();async function l(e){try{await navigator.clipboard.writeText(e)}catch{r.text(`There was an error`)}}var u={onClick(e){let t=e.target.matches(`#newnote`),n=e.target.matches(`#addnote`),a=e.target.dataset.note,u=e.target.matches(`#locknote`),d=e.target.dataset.save,f=e.target.dataset.download,p=e.target.dataset.copy,m=e.target.dataset.remove,h=e.target.dataset.close,g=e.target.matches(`#opensettings`),_=e.target.matches(`#exportnotes`),v=document.querySelector(`#templateview`),y=document.querySelector(`#templatebackup`),b=document.querySelector(`#templatenotes`),x=document.querySelector(`#templatenew`);if(t&&!v&&!y&&(b.classList.add(`is-hidden`),i.newNote(),document.querySelector(`#areanew`).focus()),n){let e=document.querySelector(`#areanew`);e.value.length>0?(o.addNote(e.value),s(`#templatenew`),r.show(`Note added`)):s(`#templatenew`)}if(a&&!x&&!y){b.classList.add(`is-hidden`);let e=o.noteValue(a);i.viewNote(a,e)}if(u){let e=document.querySelector(`#areaview`);if(e.hasAttribute(`readonly`)){e.removeAttribute(`readonly`);let t=e.value.length;e.focus(),e.setSelectionRange(t,t),e.scrollTop=e.scrollHeight}else e.setAttribute(`readonly`,!0);document.querySelector(`#locknote`).classList.toggle(`is-unlock`)}if(d){let e=document.querySelector(`#areaview`);e.value.length>0?(o.saveNote(d,e.value),s(`#templateview`),r.show(`Note saved`)):(o.removeNote(d),s(`#templateview`),r.show(`Note deleted`))}if(f){let e=o.noteValue(f);(0,c.saveAs)(new Blob([e],{type:`text/plain;charset=utf-8`}),`${f}.txt`)}if(p&&(l(o.noteValue(p)),r.show(`Copied to clipboard`)),m&&(o.removeNote(m),s(`#templateview`),r.show(`Note deleted`)),h&&s(`#${h}`),g&&(b.classList.add(`is-hidden`),i.backupNotes()),_){let e=o.exportNotes();(0,c.saveAs)(new Blob([e],{type:`application/json;charset=utf-8`}),`notes.json`)}},onChange(e){if(e.target.matches(`#importdata`)){let e=document.querySelector(`#importdata`).files[0],t=new FileReader;t.readAsText(e),t.onload=()=>{if(e.type===`application/json`)if(t.result.includes(`{`))try{o.importNotes(t.result),s(`#templatebackup`),r.show(`Notes updated`)}catch(e){e&&(r.show(`Error with database`),o.reset())}else r.show(`Error with database`);else r.show(`File not compatible`)}}},init(){document.addEventListener(`click`,this.onClick),document.addEventListener(`change`,this.onChange)}};function d(){u.init(),i.manageNotes(),o.load()}document.addEventListener(`DOMContentLoaded`,d);