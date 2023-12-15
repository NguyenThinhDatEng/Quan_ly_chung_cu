// Enum
import _enum from "@/commons/enum";

export default {
  name: "BaseList",
  props: {},
  data() {
    return { detailForm: "", store: {} };
  },
  computed: {
    /**
     * 60: header height
     * 40: padding top and bottom
     * 20: padding bottom of toolbar
     * 32: height of toolbar
     */
    tableMaxHeight() {
      return window.innerHeight - 60 - 40 - 20 - 32;
    },

    tableData() {
      return this.store.state?.items ?? [];
    },
  },
  created() {
    const me = this;

    me.initConfig();
  },
  mounted() {
    window._list = this;
  },
  methods: {
    /**
     * @description Khởi tạo cấu hình cho list
     */
    initConfig() {},

    handleOnClickAddButton() {
      const me = this;
      if (!me.detailForm) {
        throw new Error("detailForm is required");
      }
      const param = {
        mode: _enum.Mode.Add,
        detailForm: me.detailForm,
      };
      me.$vfm.show({ component: me.detailForm }, param).then(() => {
        // do something on modal opened
        console.log(me.detailForm);
      });
    },

    handleOnEditGrid({ row }) {
      const me = this;
      if (!me.detailForm) {
        throw new Error("detailForm is required");
      }
      const param = {
        mode: _enum.Mode.View,
        detailData: row,
        detailForm: me.detailForm,
      };
      me.$vfm.show({ component: me.detailForm }, param).then(() => {
        // do something on modal opened
        console.log(me.detailForm);
      });
    },
  },
};
