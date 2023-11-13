export default {
  name: "BaseList",
  props: {},
  data() {
    return { title: "", model: {} };
  },
  computed: {},
  created() {
    const me = this;

    me.initConfig();
  },
  mounted() {
    window._detail = this;
  },
  methods: {
    /**
     * @description Khởi tạo cấu hình cho list
     */
    initConfig() {},
  },
};
