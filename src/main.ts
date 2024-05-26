import { createApp } from 'vue'
import './styles/main.css'
// @ts-ignore
import App from './App.vue'
import vuetify from "./plugins/vuetify.ts";
import PhosphorIcons from "@phosphor-icons/vue";
import router from './router'

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(PhosphorIcons);
app.mount('#app')
