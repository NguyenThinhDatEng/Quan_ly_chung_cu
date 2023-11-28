import { createRouter, createWebHistory } from "vue-router";
// Pages
import NotFound from "@/pages/NotFound.vue";
// Layout
import Main from "@/components/layout/main/Main.vue";
// Authentication
import LogIn from "@/views/Authentication/LogIn.vue";
//#region Contents
import Overview from "@/views/overview/Overview.vue";
// Management
import ContributionFeesList from "@/views/management/contributionFees/ContributionFeesList.vue";
import ResidentsList from "@/views/management/residents/ResidentsList.vue";
import FeesList from "@/views/management/fees/FeesList.vue";
import RoomRentalList from "@/views/management/roomRental/RoomRentalList.vue";
// Thống kê
import RevenueView from "@/views/statistic/revenue/RevenueView.vue";
// Dictionary
import ApartmentList from "@/views/dictionary/apartment/ApartmentList.vue";
//#endregion

// init routes
const routes = [
  {
    path: "/",
    name: "main",
    meta: {
      requiresAuth: true,
    },
    component: Main,
    redirect: () => {
      return { path: "/tong-quan" };
    },
    children: [
      {
        path: "/tong-quan",
        name: "Overview",
        component: Overview,
      },
      // Quản lý thông tin
      {
        path: "quan-ly-thong-tin-cac-khoan-thu-phi-dong-gop",
        name: "ContributionFeesList",
        component: ContributionFeesList,
      },
      {
        path: "quan-ly-thu-phi",
        name: "FeesList",
        component: FeesList,
      },
      {
        path: "quan-ly-cu-dan",
        name: "RoomRentalList",
        component: RoomRentalList,
      },
      // Thống kê
      {
        path: "thong-ke-doanh-thu",
        name: "RevenueView",
        component: RevenueView,
      },
      // Danh mục
      {
        path: "thong-tin-cu-dan",
        name: "ResidentsList",
        component: ResidentsList,
      },
      {
        path: "thong-tin-can-ho",
        name: "ApartmentList",
        component: ApartmentList,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
  {
    path: "/Login",
    name: "Login",
    component: LogIn,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (sessionStorage.getItem("userId")) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});

export default router;
