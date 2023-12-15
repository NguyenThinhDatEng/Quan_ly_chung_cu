import _enum from "@/commons/enum";

export default {
  name: "BaseList",
  props: {},
  data() {
    return {
      title: "",
      model: {},
      defaultModel: {},
      editMode: _enum.Mode.Add,
      _enum,
    };
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
     * @description Khởi tạo cấu hình
     */
    initConfig() {
      const me = this;
      // update model with default model
      const keys = Object.keys(me.defaultModel);
      if (keys.length > 0) {
        me.model = { ...me.defaultModel };
      }
    },

    /**
     * Thực hiện trước khi mở modal
     * @param {Object} e event
     */
    beforeOpen($event) {
      const me = this;
      me._formParam = $event.ref.params?.value;
      const { mode, detailData } = me._formParam;
      if (mode == _enum.Mode.Update) {
        me.model = { ...detailData };
      }
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
      // update edit mode
      me.editMode = mode;
      // do action
      switch (mode) {
        case _enum.Mode.Add:
          // hide form
          me.hide();
          break;
        case _enum.Mode.Update:
          // update title
          me.updateTitle(mode);
          break;
        default:
          break;
      }
    },

    hide() {
      const me = this;
      if (me._formParam?.detailForm) {
        me.$vfm.hide(me._formParam.detailForm);
      }
    },
  },
};
