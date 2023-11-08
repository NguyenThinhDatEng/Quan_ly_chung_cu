<template>
  <el-container class="layout-container-demo">
    <el-header style="text-align: right; font-size: 12px">
      <div class="toolbar">
        <el-dropdown>
          <el-icon style="margin-right: 8px; margin-top: 1px"
            ><setting
          /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>View</el-dropdown-item>
              <el-dropdown-item>Add</el-dropdown-item>
              <el-dropdown-item>Delete</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>NVThinh</span>
      </div>
    </el-header>
    <el-container direction="horizontal">
      <el-aside width="200px">
        <el-scrollbar>
          <!-- :default-openeds="['1', '3']" -->
          <el-menu
            :default-active="activeIndex"
            :active-text-color="activeTextColor"
            :router="true"
            @select="handleSelect"
          >
            <el-sub-menu
              v-for="(item, i) in elSubMenus"
              :key="i"
              :index="i + 1"
              :class="{
                'hide-collapse-icon': item.isHideCollapseIcon,
              }"
            >
              <template #title>
                <el-icon><component :is="item.iconName" /></el-icon
                >{{ item.elSubMenuName }}
              </template>
              <el-menu-item-group
                v-for="(menuItem, a) in item.elMenuItemGroups"
                :key="a"
              >
                <el-menu-item :index="menuItem.path" :route="menuItem.route">{{
                  menuItem.elMenuItemName
                }}</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
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
import { Menu as Message, Setting, ElementPlus } from "@element-plus/icons-vue";

export default {
  name: "MainView",
  components: {
    Message,
    Setting,
    ElementPlus,
  },
  setup() {
    const { proxy } = getCurrentInstance();

    const elSubMenus = [
      {
        elSubMenuName: "Tổng quan",
        iconName: "message",
        isHideCollapseIcon: true,
        path: "/",
      },
      {
        elSubMenuName: "Demo",
        iconName: "elementPlus",
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

    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return { elSubMenus, activeIndex, activeTextColor, handleSelect };
  },
};
</script>

<style lang="scss">
.layout-container-demo {
  height: 100vh;

  .el-container {
    height: 100%;

    .hide-collapse-icon {
      .el-sub-menu__icon-arrow {
        display: none;
      }
    }

    .el-main {
      height: 100%;
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
