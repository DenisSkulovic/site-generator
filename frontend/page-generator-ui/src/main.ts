import { createApp } from 'vue'
import App from './App.vue'
import './assets/design-system.css'

console.log(import.meta.env);

window.state = {}

const app = createApp(App)
app.mount('#app')