import { createRouter, createWebHistory } from "vue-router";
// Pages
import NotFound from "@/pages/NotFound.vue";
// Layout
import Main from "@/components/layout/main/Main.vue";
// Demo
import PopupDemo from "@/views/demo/PopupDemo.vue";
// Authentication
import LogIn from "@/views/Authentication/LogIn.vue";

// init routes
const routes = [
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "popupDemo",
        name: "PopupDemo",
        component: PopupDemo,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
  {
    path: "/Login",
    component: LogIn
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
