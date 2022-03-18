import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Swal from "sweetalert2";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import "sweetalert2/dist/sweetalert2.css"
import "toastify-js/src/toastify.css"

const app = createApp(App)

export const SweetAlert = Swal

app.use(router)
app.use(store)

app.mount('#app')
