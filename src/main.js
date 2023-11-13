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
import TDynamicPopup from "./components/popup/TDynamicPopup.vue";
import GridViewer from "./components/grid/GridViewer.vue";
import ContributionFeesDetail from "@/views/management/contributionFees/ContributionFeesDetail.vue";

const app = createApp(App);

app.use(vfmPlugin);
app.component("TDynamicPopup", TDynamicPopup);
app.component("GridViewer", GridViewer);
app.component("ContributionFeesDetail", ContributionFeesDetail);

app.use(ElementPlus);
app.use(router);
app.use(store);

app.mount("#app");
