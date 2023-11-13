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
      me.$vfm.show(me.detailForm).then(() => {
        // do something on modal opened
        console.log(me.detailForm);
      });
    },
  },
};
