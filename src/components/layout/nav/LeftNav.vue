<template>
  <div class="left-nav-content">
    <div class="menu-item" v-for="(item, index) in menu" :key="item.id">
      <p @click="showSubMenu(index)">{{ item.name }}</p>
      <div v-if="item.isShowSubMenu" class="menu-sub-item">
        <router-link
          v-for="subItem in item.subMenu"
          :key="subItem.name"
          :to="subItem.linkTo"
          class="sub-item"
          >{{ subItem.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive } from "vue";
// Resources
import i18nLayout from "@/i18n/components/i18nLayout";

export default {
  name: "LeftNav",
  setup() {
    const { proxy } = getCurrentInstance();

    const menu = reactive([
      {
        path: "demo",
        name: "Demo",
        isShowSubMenu: false,
        subMenu: [
          {
            name: "PopupDemo",
            linkTo: { name: "PopupDemo" },
          },
        ],
      },
    ]);

    /**
     * @description Hiển thị sub menu
     * @param {Number} index
     * @author nvthinh 17.9.2023
     */
    const showSubMenu = (index) => {
      const me = proxy;
      // Cập nhật ẩn hiện sub menu cho toàn bộ menu
      menu.forEach((item, i) => {
        if (i === index) {
          item.isShowSubMenu = !item.isShowSubMenu;
        } else {
          item.isShowSubMenu = false;
        }
      });
      // Cập nhật router
      me.$router.push({ name: menu[index].path });
    };

    onMounted(() => {
      reload();
    });

    const reload = () => {
      const me = proxy;
      // Cập nhật show sub menu
      const routePath = me.$route.path;
      const itemPaths = menu.map((item) => item.path);
      itemPaths.some((path) => {
        if (routePath.includes(path)) {
          const index = menu.findIndex((item) => item.path == path);
          menu[index].isShowSubMenu = true;
          return true;
        }
      });
    };

    return { showSubMenu, menu, i18nLayout };
  },
};
</script>

<style scoped>
.left-nav-content {
  display: flex;
  flex-direction: column;
  width: 15%;
  height: 100%;
  background-color: #393a3d;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  color: white;
}

.menu-item:hover {
  cursor: pointer;
}

.menu-item p {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0;
  height: 48px;
  border-radius: 4px;
}

.menu-item p:hover {
  background-color: #59595d;
}

.menu-sub-item {
  width: 100%;
}

.sub-item {
  display: flex;
  align-items: center;
  height: 44px;
  padding-left: 8px;
  border-radius: 4px;
  color: #fff;
}

.sub-item:hover {
  background-color: #59595d;
}
</style>