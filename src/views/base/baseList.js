// Enum
import _enum from "@/commons/enum";
// components
import { ElMessageBox, ElMessage } from "element-plus";

export default {
  name: "BaseList",
  props: {},
  data() {
    return { detailForm: "", store: {}, loading: false };
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

    idField() {
      return this.store.state?.idField ?? "";
    },
  },
  async created() {
    const me = this;
    me.loading = true;

    me.initConfig();

    await me.getTableData();

    me.loading = false;
  },
  mounted() {
    window._list = this;
  },
  methods: {
    /**
     * @description Khởi tạo cấu hình cho list
     */
    initConfig() {},

    async getTableData() {
      const me = this;
      // Lấy dữ liệu danh sách
      if (typeof me.store.dispatch == "function") {
        await me.store?.dispatch("getAll");
      }
    },

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

    handleOnDeleteGrid({ row }) {
      const me = this;

      ElMessageBox.alert("Bạn có thực sự muốn xóa bản ghi này?", "Xác nhận", {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: "Đồng ý",
        showCancelButton: true,
        cancelButtonText: "Hoãn",
        draggable: true,
        callback: async (action) => {
          if (action == _enum.Action.Confirm) {
            if (me.idField) {
              try {
                // CALL API
                const res = await me.store.state.api.deleteAsync(
                  row[me.idField]
                );
                // Show result
                if (
                  res?.status == _enum.APIStatus.Ok &&
                  res?.data?.code == _enum.APICode.Success
                ) {
                  // update store
                  me.store.commit("delete", res.data.entity);
                  // show toast
                  ElMessage({
                    message: "Xóa thành công",
                    type: "success",
                  });
                } else {
                  if (res?.data?.code == _enum.APICode.Fail) {
                    ElMessage.error(res.data.message);
                  }
                  ElMessage.error("Có lỗi xảy ra!");
                }
              } catch (error) {
                console.log(error);
                ElMessage.error("Có lỗi xảy ra!");
              }
            }
          }
        },
      });
    },
  },
};
