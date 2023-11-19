import _enum from "@/commons/enum";

export default {
  name: "BaseList",
  props: {},
  data() {
    return { title: "", model: {}, editMode: _enum.Mode.Add };
  },
  computed: {
    viewing() {
      return this.editMode == _enum.Mode.View;
    },
  },
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

    /**
     * Thực hiện trước khi mở modal
     * @param {Object} e event
     */
    beforeOpen($event) {
      const me = this;
      me._formParam = $event.ref.params?.value;
      const { mode } = me._formParam;
      me.updateTitle(mode);
    },

    /**
     * Xử lý sau khi đã mở modal
     */
    opened() {
      const me = this;
      me.editMode = me._formParam?.mode;
    },

    /**
     * Cập nhật title theo Mode
     * @param {Number} mode Mode của màn detail
     */
    updateTitle(mode) {
      const me = this;
      const titleTmp = me.title.toLowerCase();
      switch (mode) {
        case _enum.Mode.Add:
          me.title = "Thêm " + titleTmp;
          break;
        case _enum.Mode.Update:
          me.title = "Sửa " + titleTmp;
          break;
        default:
          break;
      }
    },

    /**
     * Xử lý sự kiện khi click vào các nút chức năng
     * @param {Number} mode Chế độ chức năng
     */
    commandClick(mode) {
      const me = this;
      this.editMode = mode;
      me.updateTitle(mode);
      switch (mode) {
        case _enum.Mode.Add:
          break;
        case _enum.Mode.Update:
          break;
        default:
          break;
      }
    },
  },
};
