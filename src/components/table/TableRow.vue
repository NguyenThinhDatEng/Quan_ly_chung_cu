<template>
  <!-- Table row  -->
  <tr
    :class="{ 'row--active': isActive }"
    @click="handleOnClickRow"
    @keydown.enter="handleOnClickRow"
    @dblclick="clickGridAction(Enum.Mode.Update)"
  >
    <TableData
      v-for="td in tds"
      :key="td.col"
      :config="td"
      :content="getTdContent(td.col)"
      :isActive="isActive"
      :features="features"
      ref="td"
      @click-checkbox="onClickCheckBox = true"
      @click-grid-action="clickGridAction"
    />
  </tr>
</template>

<script>
// Resources
import Enum from "@/commons/enum";
import Resource from "@/commons/resource";
import Function from "@/commons/commonFunction";
import TableResource from "@/commons/resource/tableResource";
import dictionary from "@/commons/resource/dictionary";
// Components
import TableData from "./TableData.vue";

export default {
  name: "TableRow",
  props: {
    index: {
      type: Number,
      isRequired: true,
      default: 0,
    }, // Chỉ số của dòng
    numerical_order: {
      type: Number,
      isRequired: true,
      default: 0,
    }, // Số thứ tự
    tds: {
      type: Array,
      required: true,
      default: () => [],
    }, // Style các ô dữ liệu trong bảng
    isOnly: {
      type: Boolean,
      default: false,
    }, // Chỉ 1 dòng được active trong bảng
    /**
     * @description Ẩn/hiện các tính năng
     * @author nvthinh 1/9/2023
     */
    feature: {
      type: Boolean,
      default: false,
    },
    tableRowObj: Object, // Đối tượng chứa dữ liệu hiển thị
    isCheckAll: Boolean, // true nếu ô checkbox all được tick
    isRefreshTable: Boolean, // làm mới bảng => bỏ active tất cả các dòng
    /**
     * Mảng các tính năng hiển thị
     */
    features: {
      type: Array,
      default: () => {
        return ["edit", "delete"];
      },
    },
  },

  components: {
    TableData,
  },

  emits: [
    "update-row",
    "update-checked-header",
    "update-popup-object",
    "update-voucher",
    "reload-content",
    "click-checkbox",
    "click-grid-action",
  ],

  created() {
    try {
      // Cập nhật mảng data
      this.data = Object.assign(this.tableRowObj);
      this.updateRow();
      this.updateData();
    } catch (error) {
      console.log(error);
    }
  },

  watch: {
    // Cập nhật trạng thái active của dòng
    isCheckAll: function () {
      this.isActive = this.isCheckAll;
      if (
        this.isOnly &&
        this.numerical_order == 1 &&
        this.isCheckAll == false
      ) {
        this.isActive = true;
        // Gửi dữ liệu đến table
        this.$emit("update-row", true, this.data, 1);
      }
    },

    // Cập nhật giá trị khi reload dữ liệu
    tableRowObj: function () {
      this.data = Object.assign(this.tableRowObj);
      this.updateRow();
      this.updateData();
    },

    // Làm mới bảng dữ liệu
    isRefreshTable: function () {
      this.isActive = false;
    },
  },

  methods: {
    /**
     * @description Phát tín hiệu đến lớp cha khi click vào nút sửa
     * @author NVThinh 6/1/2023
     */
    updateVoucher: function (mode) {
      this.$emit(
        "update-voucher",
        mode,
        this.tableRowObj,
        this.numerical_order - 1
      );
    },

    /**
     * @description active dòng
     * @author NVThinh 5/1/2023
     */
    onActive: function () {
      this.$nextTick(() => {
        this.isActive = true;
      });
    },

    /**
     * @description Lấy nội dung hiển thị của td
     * @param {String} col Tên cột
     * @author NVThinh 2/1/2023
     */
    getTdContent: function (col) {
      try {
        if (col === TableResource.TableRow.FixedAsset.numerical_order.ENG) {
          return this.numerical_order;
        }
        return this.tableRowObj[col];
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Sự kiện nhấn vào tính năng của bảng
     * @author Nguyen Van Thinh 6.9.2023
     */
    clickGridAction: function (mode) {
      try {
        // Gửi dữ liệu lên table
        this.$emit("click-grid-action", mode, this.tableRowObj);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Xử lý sự kiện click vào 1 dòng
     * @author Nguyen Van Thinh 05/11/2022
     */
    handleOnClickRow: function () {
      try {
        const isNew = true;
        // Thay đổi trạng thái của dòng
        this.isActive = !this.isActive;
        // this.$emit('update:isActive', true);
        // Nếu dòng được active, bắn đối tượng đến Table
        if (this.isActive == isNew) {
          this.$emit(
            "update-row",
            isNew,
            this.data,
            this.index,
            this.onClickCheckBox
          );
        } else {
          if (this.isCheckAll == true) {
            this.$emit("update-checked-header", false);
          }
          this.$emit("update-row", !isNew, this.data, this.index); // isNew == false
        }
        // refresh trạng thái tick checkbox
        this.onClickCheckBox = false;
      } catch (error) {
        console.log(error);
      }
    },

    updateRow: function () {},

    // Cập nhật data
    updateData: function () {},
  },
  data() {
    return {
      data: {}, // Đối tượng table row chứa các dữ liệu hiển thị trong file excel
      isActive: false, // trạng thái của table row
      popupMode: 0, // chế độ popup
      isShowPopup: false, // trạng thái ẩn hiện popup
      isShowToast: false, // trạng thái ẩn hiện toast
      fields: Resource.PopupField, // các trường input trong popup
      onClickCheckBox: false, // true nếu click vào ô checkbox
      // Resources
      Resource,
      Function,
      Enum,
      dictionary,
      props: TableResource.TableRow.FixedAsset,
    };
  },
};
</script>

<style scoped>
tr {
  position: relative;
}
tr .feature {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
}

tr .feature .icon__wrapper {
  position: relative;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  background-color: #d1edf4;
}

/* tr .feature .icon__wrapper:hover {
  background-color: #fff;
} */
</style>