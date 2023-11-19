<template>
  <el-container class="layout-container-demo">
    <!-- Header -->
    <el-header style="font-size: 24px">
      <div class="header-content">
        <span>{{ headerTitle }}</span>
        <div class="toolbar">
          <el-dropdown>
            <el-icon class="pointer" :size="iconSize"><UserFilled /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="feature in personalFeature"
                  :key="feature"
                  >{{ feature }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>NVThinh</span>
        </div>
      </div>
    </el-header>
    <!-- Content -->
    <el-container direction="horizontal">
      <el-aside :width="elAside.width + 'px'">
        <el-scrollbar>
          <!-- :default-openeds="['1', '3']" -->
          <el-menu
            :default-active="activeIndex"
            :active-text-color="activeTextColor"
            :router="true"
            @select="handleSelect"
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
                  <el-menu-item :index="menuItem.path">{{
                    menuItem.elMenuItemName
                  }}</el-menu-item>
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
import { getCurrentInstance, ref } from "vue";
import {
  Menu as HomeFilled,
  Setting,
  ElementPlus,
  Histogram,
  User,
  UserFilled,
  Management,
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
  },
  setup() {
    const { proxy } = getCurrentInstance();

    //#region General
    const iconSize = 32;
    //#endregion

    //#region Header
    const headerTitle = "Phần mềm quản lý chung cư";
    const personalFeature = [
      "Thông tin cá nhân",
      "Thay đổi mật khẩu",
      "Đăng xuất",
    ];
    //#endregion

    //#region Nav
    const elSubMenus = [
      {
        elSubMenuName: "Tổng quan",
        iconName: "Histogram",
        path: "/",
      },
      {
        elSubMenuName: "Quản lý thông tin",
        iconName: "Management",
        path: "/management",
        elMenuItemGroups: [
          {
            elMenuItemName: "Các khoản thu phí đóng góp",
            path: "/quan-ly-thong-tin-cac-khoan-thu-phi-dong-gop",
          },
          {
            elMenuItemName: "Thông tin cơ bản về các hộ gia đình",
            path: "/quan-ly-thong-tin-co-ban-ve-cac-ho-gia-dinh",
          },
        ],
      },
      {
        elSubMenuName: "Demo",
        iconName: "ElementPlus",
        elMenuItemGroups: [
          {
            elMenuItemName: "PopupDemo",
            path: "/popupDemo",
          },
          {
            elMenuItemName: "InputDemo",
            path: "/inputDemo",
          },
        ],
      },
    ];

    const activeIndex = ref(proxy.$route.path);
    const activeTextColor = ref("#63ace5");
    const elAside = {
      width: 285,
    };

    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath);
    };
    //#endregion

    return {
      elSubMenus,
      activeIndex,
      activeTextColor,
      handleSelect,
      headerTitle,
      personalFeature,
      iconSize,
      elAside,
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
