// app
import { createApp } from "vue";
import App from "./App.vue";
// global style
import "./assets/styles/global.css";
import "@/assets/styles/icon.css";
// vue router
import router from "@/routers/router";
// vuex
import store from "./stores";
// Popup
import { vfmPlugin } from "vue-final-modal";
import TDynamicPopup from "./components/popup/TDynamicPopup.vue";
// Component
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(vfmPlugin);
app.component("TDynamicPopup", TDynamicPopup);

app.use(ElementPlus);
app.use(router);
app.use(store);

app.mount("#app");
