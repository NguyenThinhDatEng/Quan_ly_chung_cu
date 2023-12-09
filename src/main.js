// app
import { createApp } from "vue";
import App from "./App.vue";
// global style
import "@/assets/styles/global.css";
import "@/assets/styles/icon.css";
// vue router
import router from "@/routers/router";
// vuex
import store from "./stores";
// Popup
import { vfmPlugin } from "vue-final-modal";
// Global Components
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(vfmPlugin);

// Khai báo dùng chung
import { useComponents } from "./commons/globalComponents";
useComponents(app);
// Đăng ký các detail
import { register } from "./commons/popupRegister/register";
register(app);

app.use(ElementPlus);
app.use(router);
app.use(store);

app.mount("#app");
