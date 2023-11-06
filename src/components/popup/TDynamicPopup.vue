<template>
  <vue-final-modal
    v-slot="{ close }"
    :name="null"
    :value="false"
    :ssr="true"
    :classes="'modal-container'"
    overlay-class=""
    content-class="modal-content"
    styles=""
    overlay-style=""
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
        <button @click="close">x</button>
      </div>
    </div>
    <div class="modal_content">
      <slot name="content" />
    </div>
    <div class="modal_footer">
      <slot name="footer" />
    </div>
  </vue-final-modal>
</template>

<script>
import { computed } from "vue";

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
  },
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

    return {
      styles,
      classes,
    };
  },
};
</script>

<style scoped>
:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.modal-content) {
  background-color: white;
  padding: 20px;
}

.modal_title {
  display: flex;
  justify-content: space-between;
}

.modal_title .title {
  font-size: 24px;
}

.modal_content {
  display: flex;
  flex-direction: column;
}
</style>
