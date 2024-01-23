import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "@/router/index";
import { anu } from "anu-vue";
// anu styles
import "anu-vue/dist/style.css";
// default theme styles
import "@anu-vue/preset-theme-default/dist/style.css";
// import "./style.css";
import "virtual:uno.css";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(anu, {
    registerComponents: false,
    themes: {
        dark: {
            colors: {
                primary: "217.22deg,91.22%,59.8%",
                info: "173.41deg,80.39%,40%",
                danger: "347.14deg,77.17%,49.8%",
                warning: "43.26deg,96.41%,56.27%",
                success: "142.09deg,70.56%,45.29%"
            }
        },
        light: {
            colors: {
                primary: "217.22deg,91.22%,59.8%",
                info: "173.41deg,80.39%,40%",
                danger: "347.14deg,77.17%,49.8%",
                success: "142.09deg,70.56%,45.29%",
                warning: "43.26deg,96.41%,56.27%",
            }
        }
    }
});
app.mount("#app");
