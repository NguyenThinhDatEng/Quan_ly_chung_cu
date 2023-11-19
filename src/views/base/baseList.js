// Enum
import _enum from "@/commons/enum";

export default {
  name: "BaseList",
  props: {},
  data() {
    return { detailForm: "" };
  },
  computed: {},
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
      };
      me.$vfm.show({ component: me.detailForm }, param).then(() => {
        // do something on modal opened
        console.log(me.detailForm);
      });
    },

    handleOnEditGrid() {
      const me = this;
      if (!me.detailForm) {
        throw new Error("detailForm is required");
      }
      const param = {
        mode: _enum.Mode.View,
      };
      me.$vfm.show({ component: me.detailForm }, param).then(() => {
        // do something on modal opened
        console.log(me.detailForm);
      });
    },
  },
};
