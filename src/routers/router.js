import { createRouter, createWebHistory } from "vue-router";
// Pages
import NotFound from "@/pages/NotFound.vue";
// Layout
import Main from "@/components/layout/main/Main.vue";
// Authentication
import LogIn from "@/views/Authentication/LogIn.vue";
// Profile
import ProfileView from "@/views/profile/ProfileView.vue";
//#region Contents
import Overview from "@/views/overview/Overview.vue";
// Management
import ContributionFeesList from "@/views/management/contributionFees/ContributionFeesList.vue";
import FeesList from "@/views/management/fees/FeesList.vue";
import RoomRentalList from "@/views/management/roomRental/RoomRentalList.vue";
// Thống kê
import RevenueView from "@/views/statistic/revenue/RevenueView.vue";
import VehicleStatistic from "@/views/statistic/vehicle/VehicleStatistic.vue";
import StatusStatistic from "@/views/statistic/status/StatusStatistic.vue";
// Dictionary
import ApartmentList from "@/views/dictionary/apartment/ApartmentList.vue";
import ResidentsList from "@/views/dictionary/residents/ResidentsList.vue";
import VehicleList from "@/views/dictionary/vehicle/VehicleList.vue";
import ServiceList from "@/views/dictionary/service/ServiceList.vue";
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
        path: "quan-ly-cac-ho-gia-dinh",
        name: "RoomRentalList",
        component: RoomRentalList,
      },
      // Thống kê
      {
        path: "doanh-thu",
        name: "RevenueView",
        component: RevenueView,
      },
      {
        path: "phuong-tien",
        name: "VehicleStatistic",
        component: VehicleStatistic,
      },
      {
        path: "tinh-trang",
        name: "StatusStatistic",
        component: StatusStatistic,
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
      {
        path: "phi-gui-xe",
        name: "VehicleList",
        component: VehicleList,
      },
      {
        path: "phi-dich-vu",
        name: "ServiceList",
        component: ServiceList,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
  {
    path: "/Login",
    name: "Login",
    component: LogIn,
  },
  // Thông tin cá nhân
  {
    path: "/thong-tin-ca-nhan",
    name: "ProfileView",
    component: ProfileView,
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
    if (sessionStorage.getItem("userToken")) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});

export default router;
