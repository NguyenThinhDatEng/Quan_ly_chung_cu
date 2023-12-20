import _enum from "@/commons/enum";
// components
import { ElMessage } from "element-plus";

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
      const { mode } = me._formParam;

      // Cập nhật edit mode
      me.editMode = mode;

      // Cập nhật model
      if (me.viewing) {
        const detailData = me._formParam.detailData;
        me.model = { ...detailData };
      } else {
        // update model with default model
        const keys = Object.keys(me.defaultModel);
        if (keys.length > 0) {
          me.model = { ...me.defaultModel };
        }
      }
    },

    /**
     * Xử lý sau khi đã mở modal
     */
    opened() {
      const me = this;
      me.updateTitle(me.editMode);
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
            await me.insert();
            break;
          case _enum.Mode.Update:
            await me.update();
            break;
        }
      } catch (error) {
        console.log(error);
        ElMessage.error("Có lỗi xảy ra!");
      } finally {
        me.loading = false;
      }
    },

    async insert() {
      const me = this;
      try {
        // CALL API
        const res = await me.store.state.api.postAsync(me.model);
        // Show result
        if (
          res?.status == _enum.APIStatus.Ok &&
          res?.data?.code == _enum.APICode.Success
        ) {
          // update store
          me.store.commit("insert", res.data.entity);
          // show toast
          ElMessage({
            message: "Thêm mới thành công",
            type: "success",
          });
          // Xử lý sau khi lưu thành công
          if (res.data.entity) {
            me.submitSuccess(res.data.entity);
          }
          // hide form
          me.hide();
        } else {
          if (res?.data?.code == _enum.APICode.Fail) {
            ElMessage.error(res.data.message);
          } else {
            ElMessage.error("Có lỗi xảy ra!");
          }
        }
      } catch (error) {
        ElMessage.error("Có lỗi xảy ra!");
      }
    },

    async update() {
      const me = this;
      try {
        // CALL API
        const res = await me.store.state.api.putAsync(me.model);
        // Show result
        if (
          res?.status == _enum.APIStatus.Ok &&
          res?.data?.code == _enum.APICode.Success
        ) {
          // update store
          me.store.commit("update", res.data.entity);
          // show toast
          ElMessage({
            message: "Cập nhật thành công",
            type: "success",
          });
          // Xử lý sau khi lưu thành công
          if (res.data.entity) {
            me.submitSuccess(res.data.entity);
          }
          // hide form
          me.hide();
        } else {
          if (res?.data?.code == _enum.APICode.Fail) {
            ElMessage.error(res.data.message);
          } else {
            ElMessage.error("Có lỗi xảy ra!");
          }
        }
      } catch (error) {
        ElMessage.error("Có lỗi xảy ra!");
      }
    },

    hide() {
      const me = this;
      if (me._formParam?.detailForm) {
        me.$vfm.hide(me._formParam.detailForm);
      }
    },

    submitSuccess(data) {},
  },
};
