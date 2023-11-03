import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import type { Config } from './types/types'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// Redefine window to include _config
declare global {
    interface Window {
        _config: Config;
    }
}

const app = createApp(App)
app.use(router)
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// Load config
fetch('/config.json').then((response)=>{
    return response.json()
})
.then((config)=>{
    window._config = config;
})
.then(()=>{
    app.mount('#app')
})