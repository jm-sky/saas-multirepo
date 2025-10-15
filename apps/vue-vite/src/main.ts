import { VueQueryPlugin } from '@tanstack/vue-query'
import { vTooltip } from 'floating-vue'
import './css/style.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { setNavigateFunction } from 'vue-core'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Setup navigation for vue-core
setNavigateFunction((path: string) => router.push(path))

app.use(VueQueryPlugin)
app.use(createPinia())
app.use(router)
app.directive('tooltip', vTooltip)

app.mount('#app')
