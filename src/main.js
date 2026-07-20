import { createApp } from 'vue'
import App from './App.vue'
import { installUnloadGuard } from './composables/useDirtyGuard.js'

installUnloadGuard()
createApp(App).mount('#app')
