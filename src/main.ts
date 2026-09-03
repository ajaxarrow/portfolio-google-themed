import { createApp } from 'vue'
import './styles/main.css'
import App from './App.vue'
import vuetify from "./plugins/vuetify.ts";
import router from './router'
import { MotionPlugin } from '@vueuse/motion'

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(MotionPlugin);
app.mount('#app')
