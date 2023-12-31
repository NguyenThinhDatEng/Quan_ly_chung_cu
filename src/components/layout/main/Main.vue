<template>
  <el-container class="layout-container-demo">
    <!-- Header -->
    <el-header style="font-size: 24px">
      <div class="header-content">
        <span>{{ headerTitle }}</span>
        <div class="toolbar">
          <span>{{ userInfo.username ?? "" }}</span>
          <el-dropdown class="ml-2">
            <el-icon class="pointer" :size="iconSize"><UserFilled /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="feature in personalFeature"
                  :key="feature.action"
                  @click="onClickHeaderFeatures(feature.action)"
                  >{{ feature.display }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <!-- Content -->
    <el-container direction="horizontal">
      <!-- Left-Nav -->
      <el-aside v-show="!hideSidebar">
        <el-scrollbar>
          <!-- :default-openeds="['1', '3']" -->
          <el-menu
            :default-active="activeIndex"
            :active-text-color="activeTextColor"
            :router="true"
            @select="handleSelect"
            @open="openMenu"
          >
            <template v-for="(item, i) in elSubMenus" :key="i">
              <!-- Nếu mục có mục con -->
              <el-sub-menu
                v-if="item.elMenuItemGroups?.length > 0"
                :index="`${i + 1}`"
              >
                <template #title>
                  <el-icon :size="iconSize"
                    ><component :is="item.iconName" /></el-icon
                  >{{ item.elSubMenuName }}
                </template>
                <el-menu-item-group
                  v-for="(menuItem, a) in item.elMenuItemGroups"
                  :key="a"
                >
                  <el-menu-item :index="menuItem.path"
                    ><el-icon :size="iconSize"
                      ><component :is="menuItem.iconName" /></el-icon
                    >{{ menuItem.elMenuItemName }}</el-menu-item
                  >
                </el-menu-item-group>
              </el-sub-menu>
              <!-- Nếu mục không có mục con -->
              <el-menu-item v-else :index="item.path"
                ><el-icon :size="iconSize"
                  ><component :is="item.iconName" /></el-icon
                >{{ item.elSubMenuName }}</el-menu-item
              >
            </template>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <!-- Main content -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getCurrentInstance, ref, computed } from "vue";
import {
  HomeFilled,
  Setting,
  ElementPlus,
  Histogram,
  User,
  UserFilled,
  Management,
  Grid,
  Money,
  OfficeBuilding,
  HelpFilled,
  Menu,
  School,
  List,
  TrendCharts,
  Bicycle,
  Help,
  DataLine,
} from "@element-plus/icons-vue";

export default {
  name: "MainView",
  components: {
    HomeFilled,
    Setting,
    ElementPlus,
    Histogram,
    User,
    UserFilled,
    Management,
    Grid,
    Money,
    OfficeBuilding,
    HelpFilled,
    Menu,
    School,
    List,
    TrendCharts,
    Bicycle,
    Help,
    DataLine,
  },
  props: {
    hideSidebar: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { proxy } = getCurrentInstance();

    //#region Nav
    const elSubMenus = [
      {
        elSubMenuName: "Tổng quan",
        iconName: "HelpFilled",
        path: "/tong-quan",
      },
      {
        elSubMenuName: "Quản lý thông tin",
        iconName: "Management",
        path: "/management",
        elMenuItemGroups: [
          {
            elMenuItemName: "Các khoản thu phí đóng góp",
            path: "/quan-ly-thong-tin-cac-khoan-thu-phi-dong-gop",
            iconName: "List",
          },
          {
            elMenuItemName: "Quản lý thu phí",
            path: "/quan-ly-thu-phi",
            iconName: "Money",
          },
          {
            elMenuItemName: "Quản lý các hộ gia đình",
            path: "/quan-ly-cac-ho-gia-dinh",
            iconName: "OfficeBuilding",
          },
        ],
      },
      {
        elSubMenuName: "Thống kê",
        path: "/thong-ke",
        iconName: "Histogram",
        elMenuItemGroups: [
          {
            elMenuItemName: "Doanh thu",
            path: "/doanh-thu",
            iconName: "DataLine",
          },
          {
            elMenuItemName: "Tình trạng",
            path: "/tinh-trang",
            iconName: "TrendCharts",
          },
          {
            elMenuItemName: "Phương tiện",
            path: "/phuong-tien",
            iconName: "Bicycle",
          },
        ],
      },
      {
        elSubMenuName: "Danh mục",
        path: "/danh-muc",
        iconName: "Menu",
        elMenuItemGroups: [
          {
            elMenuItemName: "Thông tin căn hộ",
            path: "/thong-tin-can-ho",
            iconName: "School",
          },
          {
            elMenuItemName: "Thông tin cư dân",
            path: "/thong-tin-cu-dan",
            iconName: "HomeFilled",
          },
          {
            elMenuItemName: "Phí gửi xe",
            path: "/phi-gui-xe",
            iconName: "Bicycle",
          },
          {
            elMenuItemName: "Phí dịch vụ",
            path: "/phi-dich-vu",
            iconName: "Help",
          },
        ],
      },
    ];

    const activeIndex = ref(proxy.$route.path);
    const activeTextColor = ref("#63ace5");
    const elAside = {
      width: 350,
    };

    /**
     * Xử lý sự kiện khi chọn menu mới
     * @param {*} key
     * @param {*} keyPath
     */
    const handleSelect = () => {};
    //#endregion

    //#region General
    const iconSize = 32;
    //#endregion

    //#region Header
    const headerTitle = "Phần mềm quản lý chung cư";
    const actions = {
      viewInfo: "view-info",
      changePassword: "change-password",
      logout: "logout",
    };
    const personalFeature = [
      {
        action: actions.viewInfo,
        display: "Thông tin cá nhân",
      },
      {
        action: actions.logout,
        display: "Đăng xuất",
      },
    ];

    /**
     * Xử lý sự kiện khi click vào chức năng của header
     * @param {String} action các hành động thuộc actions
     */
    const onClickHeaderFeatures = (action) => {
      switch (action) {
        case actions.logout:
          sessionStorage.removeItem("userToken");
          sessionStorage.removeItem("userInfo");
          proxy.$router.push({ name: "Login" });
          break;
        case actions.viewInfo:
          proxy.$router.push({ name: "ProfileView" });
          break;
        default:
          break;
      }
    };
    //#endregion

    /**
     * Sự kiện mở menu (Hiển thị danh sách các sub menu)
     * @param {Number} index
     */
    const openMenu = () => {};

    const userInfo = computed(() => {
      const sessionItem = sessionStorage.getItem("userInfo");
      if (sessionItem && typeof sessionItem == "string") {
        return JSON.parse(sessionItem);
      }

      return {};
    });

    return {
      elSubMenus,
      activeIndex,
      activeTextColor,
      handleSelect,
      headerTitle,
      personalFeature,
      iconSize,
      elAside,
      onClickHeaderFeatures,
      openMenu,
      userInfo,
    };
  },
};
</script>

<style lang="scss">
.layout-container-demo {
  height: 100vh;

  .el-header {
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;

      span:first-child {
        font-size: 20px;
        font-weight: 700;
      }
    }
  }

  .el-container {
    height: 100%;

    .el-aside {
      width: 15%;
    }

    .el-main {
      padding: 20px;
    }
  }
}

.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
