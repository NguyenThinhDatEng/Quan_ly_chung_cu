import { createRouter, createWebHistory } from "vue-router";
// Pages
import NotFound from "@/pages/NotFound.vue";
// Layout
import Main from "@/components/layout/main/Main.vue";
// Demo
import PopupDemo from "@/views/demo/PopupDemo.vue";

// init routes
const routes = [
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "demo",
        name: "Demo",
        component: PopupDemo,
      },
      {
        path: "popupDemo",
        name: "PopupDemo",
        component: PopupDemo,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
