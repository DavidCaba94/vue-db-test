import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment';

window.$ = window.jQuery = require('jquery')

const app = createApp(App)

app.config.globalProperties.$filters = {
    formatDate(value) {
        if (value) {
            return moment(String(value)).format('DD/MM/YYYY')
        }
    }
}

app.use(router).mount('#app')
