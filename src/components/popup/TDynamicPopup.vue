<template>
  <vue-final-modal
    v-model="show"
    v-slot="{ close }"
    :name="name"
    :value="false"
    :ssr="true"
    classes="modal-container"
    overlay-class=""
    content-class="modal-content"
    :styles="{}"
    :overlay-style="{}"
    :content-style="styles"
    :lock-scroll="true"
    :hide-overlay="false"
    :click-to-close="true"
    :esc-to-close="false"
    :prevent-click="false"
    :attach="false"
    transition="vfm"
    overlay-transition="vfm"
    :z-index-auto="true"
    :z-index-base="1000"
    :z-index="false"
    :focus-retain="true"
    :focus-trap="false"
    :fit-parent="true"
    :drag="false"
    drag-selector=""
    :keep-changed-style="false"
    :resize="false"
    :resize-directions="['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl']"
    :min-width="200"
    :min-height="200"
    :max-width="Infinity"
    :max-height="Infinity"
  >
    <div v-if="isShowTitle" class="modal_title">
      <div class="title_left">
        <div class="title">{{ title }}</div>
        <slot name="content-title" />
      </div>
      <!-- right of title -->
      <div class="title_right">
        <el-icon :size="iconSize" @click="close"><CloseBold /></el-icon>
      </div>
    </div>
    <div class="modal_content">
      <slot name="content" />
    </div>
    <div class="modal_footer">
      <slot name="footer" :close="close" />
    </div>
  </vue-final-modal>
</template>

<script>
import { computed, ref } from "vue";
import { CloseBold } from "@element-plus/icons-vue";

export default {
  name: "TDynamicPopup",
  props: {
    title: {
      type: String,
      default: "",
    },
    isShowTitle: {
      type: Boolean,
      default: true,
    },
    maximum: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      required: true,
      default: "",
    },
  },
  components: { CloseBold },
  setup(props) {
    const styles = computed(() => {
      let style = {
        width: `${props.width}px`,
      };
      if (props.maximum) {
        style.width = "100%";
      }
      return style;
    });

    const classes = computed(() => {
      let myClass = {
        "background-color": `#fff`,
      };
      return myClass;
    });

    const iconSize = 32;

    const show = ref(false);

    return {
      styles,
      classes,
      iconSize,
      show,
    };
  },
};
</script>

<style scoped lang="scss">
:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.modal-content) {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
}

.modal_title {
  display: flex;
  justify-content: space-between;

  .title_right {
    .el-icon {
      cursor: pointer;
    }
  }
}

.modal_title .title {
  font-size: 24px;
}

.modal_content {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}
</style>
