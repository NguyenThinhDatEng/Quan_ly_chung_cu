import { createRouter, createWebHistory } from "vue-router";
// Pages
import NotFound from "@/pages/NotFound.vue";
// Layout
import Main from "@/components/layout/main/Main.vue";
// Demo
import PopupDemo from "@/views/demo/PopupDemo.vue";
import InputDemo from "@/views/demo/InputDemo.vue";
// Authentication
import LogIn from "@/views/Authentication/LogIn.vue";
// Contents
import Overview from "@/views/overview/Overview.vue";

// init routes
const routes = [
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "",
        name: "Overview",
        component: Overview,
      },
      {
        path: "popupDemo",
        name: "PopupDemo",
        component: PopupDemo,
      },
      {
        path: "inputDemo",
        name: "InputDemo",
        component: InputDemo,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
  {
    path: "/Login",
    component: LogIn,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
