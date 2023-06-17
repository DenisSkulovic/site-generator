import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Import Material Design Icons
import './assets/design-system.css'


const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
})


app.use(vuetify)
app.mount('#app')