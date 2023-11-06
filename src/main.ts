import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "@/router/index";
import { anu } from "anu-vue";
// anu styles
import "anu-vue/dist/style.css";
// default theme styles
import "@anu-vue/preset-theme-default/dist/style.css";
import "./style.css";
import "virtual:uno.css";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(anu, { registerComponents: false });
app.mount("#app");
