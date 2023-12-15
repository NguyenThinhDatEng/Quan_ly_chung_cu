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
      store: {},
      loading: false,
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
    initConfig() {},

    /**
     * Thực hiện trước khi mở modal
     * @param {Object} e event
     */
    beforeOpen($event) {
      const me = this;
      me._formParam = $event.ref.params?.value;
      const { mode, detailData } = me._formParam;
      if (mode == _enum.Mode.View) {
        me.model = { ...detailData };
      } else {
        // update model with default model
        const keys = Object.keys(me.defaultModel);
        if (keys.length > 0) {
          me.model = { ...me.defaultModel };
        }
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
      // do action
      switch (mode) {
        case _enum.Mode.Add:
          // hide form
          me.hide();
          // CALL API
          me.submit();
          break;
        case _enum.Mode.Update:
          // update title
          me.updateTitle(mode);
          // update edit mode
          me.editMode = mode;
          break;
        default:
          break;
      }
    },

    beforeSubmit() {},

    async submit() {
      const me = this;
      me.loading = true;
      // handle before save
      me.beforeSubmit();
      // call API
      try {
        switch (me.editMode) {
          case _enum.Mode.Add:
            await me.store.dispatch("insert", me.model);
            break;
          case _enum.Mode.Update:
            await me.store.dispatch("update", me.model);
            break;
        }
      } catch (error) {
        console.log(error);
      } finally {
        me.loading = false;
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
