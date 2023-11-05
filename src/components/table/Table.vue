<template>
  <div class="table" id="table">
    <table>
      <!-- Table Header  -->
      <thead>
        <tr>
          <th v-if="isShowCheckbox" class="checkbox__wrapper">
            <input
              id="checkbox-header"
              type="checkbox"
              class="checkbox"
              :checked="checkedHeader"
              v-model="isCheckAll"
            />
          </th>
          <th
            v-for="(value, key) of ths"
            :key="key"
            :title="getTooltip(value.ENG)"
            :style="[
              { 'min-width': value.style?.minWidth },
              { 'max-width': value.style?.maxWidth },
              { width: value.style?.width },
              { 'text-align': value.style?.align },
            ]"
          >
            {{ value.VN }}
          </th>
        </tr>
      </thead>
      <!-- Table body  -->
      <tbody>
        <Row
          v-for="(obj, index) in data"
          :key="index"
          :index="index"
          :numerical_order="index + startIndex + 1"
          :tableRowObj="obj"
          :is-check-all="isCheckAll"
          :is-refresh-table="isRefreshTable"
          :tds="tds"
          feature
          :isOnly="onlyOneRow"
          :features="features"
          @update-row="updateRow"
          @update-voucher="updateVoucher"
          @update-checked-header="updateCheckedHeader"
          @click-grid-action="clickGridAction"
          ref="tableRow"
        ></Row>
        <tr class="ignoreRow">
          <td v-show="data.length === 0" colspan="100">
            {{ TableResource.Status.noContent }}
          </td>
        </tr>
      </tbody>
      <!-- Table footer  -->
      <TableFoot
        v-if="footer"
        ref="tableFoot"
        :footerData="footerData"
        :number-of-records="numberOfRecords"
        :page="page"
      />
    </table>
  </div>
</template>

<script>
// Components
import Row from "./TableRow.vue";
import TableFoot from "./TableFoot.vue";
// Resources
import Resource from "@/commons/resource";
import TableResource from "@/commons/resource/tableResource";

export default {
  name: "TableVue",
  props: {
    // Mảng chứa nội dung hiển thị trong bảng
    data: {
      type: Array,
      default: () => [],
    },
    // Các côt có trong bảng
    cols: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
    // Style cho các cột
    tds: {
      type: Array,
      required: true,
      default: () => [],
    },
    /**
     * @description Ẩn/hiện chân bảng
     * @author nvthinh 1/9/2023
     */
    footer: {
      type: Boolean,
      default: false,
    },
    /**
     * @description Ẩn/hiện cột checkbox
     * @author nvthinh 1/9/2023
     */
    isShowCheckbox: {
      type: Boolean,
      default: false,
    },
    /**
     * @description Ẩn/hiện các tính năng
     * @author nvthinh 1/9/2023
     */
    feature: {
      type: Boolean,
      default: false,
    },
    // loại trang xác định table foot
    page: {
      type: String,
      default: TableResource.TableFoot.Page.fixedAsset,
    },
    // Chỉ chọn 1 dòng trong bảng
    onlyOneRow: {
      type: Boolean,
      default: false,
    },
    offset: {
      type: Number,
      default: 0,
    }, // Vị trí bắt đầu của
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
  components: { Row, TableFoot },
  emits: [
    "update-row",
    "reload-content",
    "click-grid-action",
    "update-voucher",
  ],

  watch: {
    // Trạng thái chọn tất cả thay đổi
    isCheckAll: function () {
      try {
        // Tick chọn tất cả
        if (this.isCheckAll == true) {
          // Thêm tất cả các dòng vào mảng
          this.selectedRows = [];
          for (const obj of this.data) {
            this.selectedRows.push(obj);
          }
        } else {
          // Bỏ chọn tất cả
          this.selectedRows = [];
        }
        // Gửi dữ liệu lên Content
        this.$emit("update-row", this.selectedRows);
        // Trạng thái checkbox input ở table header
        this.checkedHeader = this.isCheckAll;
      } catch (error) {
        console.log(error);
      }
    },

    // Mảng dữ liệu thay đổi
    data: function () {
      // Cập nhật tổng các cột ở table footer
      this.updateFooterData();
      // Làm mới bảng dữ liệu
      this.toggle();
      // Đưa ô check ở Header về mặc định
      this.isCheckAll = false;
      // Làm mới mảng được chọn
      this.selectedRows = [];
    },

    // Cập nhật chỉ số bắt đầu của số thứ tự khi có offset truyền từ ngoài vào
    offset: function () {
      this.startIndex = this.offset;
    },
  },

  mounted() {
    // Cập nhật style cho table head
    this.ths = Object.assign(this.cols);
    let index;
    if (this.isShowCheckbox == false) {
      index = 0;
    } else {
      index = this.ths.checkbox ? 0 : 1;
    }
    for (const key in this.ths) {
      this.ths[key].style = this.tds[index];
      index++;
    }
    delete this.ths.checkbox;
  },

  methods: {
    /**
     * @description Phát tín hiệu đến lớp cha khi click vào nút sửa
     * @author NVThinh 6/1/2023
     */
    updateVoucher: function (mode, dataObj, indexOfArray) {
      this.$emit("update-voucher", mode, dataObj, indexOfArray);
    },

    /**
     * Hiển thị popup khi thực hiện chức năng
     * @param {Number} mode chế độ popup
     * @param {Object} entity
     * @author NVThinh 6.9.2023
     */
    clickGridAction: function (mode, entity) {
      try {
        this.$emit("click-grid-action", mode, entity);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thêm hoặc xóa tài sản khỏi mảng chứa các dòng được chọn
     * @param {Boolean} isNewRow true - thêm dòng mới, false - xóa dòng cũ
     * @param {Object} obj là tài sản được chọn
     * @param {Number} numericalOrder là số thứ tự của dòng
     * @author Nguyen Van Thinh 05/11/2022
     */
    updateRow: function (isNewRow, obj, index, isClickedCheckbox) {
      try {
        // Thêm dòng mới vào mảng
        if (isNewRow) {
          // Nếu Bảng chỉ cho chọn 1 dòng và đã có ít nhất 1 dòng được chọn và không phải click vào checkbox
          if (
            this.onlyOneRow &&
            this.selectedRows.length > 0 &&
            !isClickedCheckbox
          ) {
            // Làm mới bảng (xóa tất cả các dòng được active)
            this.toggle();
            // Bỏ dòng cũ
            this.selectedRows = [];
            // Active dòng theo số thứ tự
            this.$refs.tableRow[index].onActive();
          }
          this.selectedRows.push(obj);
        } else {
          if (this.onlyOneRow && this.selectedRows.length == 1) {
            this.$refs.tableRow[index].onActive();
            return;
          }
          // Xóa tài sản khỏi mảng
          const length = this.selectedRows.length;
          for (let i = 0; i < length; i++) {
            if (this.selectedRows[i].fixed_asset_id == obj.fixed_asset_id) {
              this.selectedRows.splice(i, 1);
              break;
            }
          }
        }
        // Truyền mảng các dòng được chọn lên component cha
        this.$emit("update-row", this.selectedRows);
        // console.log(this.selectedRows);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Emit: lấy dữ liệu từ Row
     * @param {Boolean} checkedHeader trạng thái checked của checkbox header
     * @author Nguyen Van Thinh 06/11/2022
     */
    updateCheckedHeader: function (checkedHeader) {
      this.checkedHeader = checkedHeader;
    },

    // Thiếp lập title cho từ viết tắt (table header)
    getTooltip: function (value) {
      try {
        if (value === this.cols.numerical_order.ENG)
          return Resource.Abbreviations.STT;
        return "";
      } catch (error) {
        console.log("Table Header", error);
      }
    },

    // Cập nhật biến chọn tất cả các dòng
    checkAll: function (checked) {
      try {
        this.isCheckAll = checked;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Cập nhật dữ liệu tại table footer
     * @author Nguyen Van Thinh 11/11/2022
     */
    updateFooterData: function () {
      try {
        // Hiển thị Loader
        this.isShowLoader = true;
        // Khởi tạo lại các giá trị trên footer table
        for (const key in this.footerData) this.footerData[key] = 0;
        // Cập nhật các dữ liệu trên table footer
        if (this.page == this.pages.voucher) {
          this.footerData.totalOfCost = this.data.reduce((accumulator, obj) => {
            return accumulator + obj.total_of_cost;
          }, 0);
        } else {
          if (this.page == this.pages.fixedAsset) {
            // Cập nhật tổng số lượng
            this.footerData.totalOfQuantities = this.data.reduce(
              (accumulator, obj) => {
                return accumulator + obj.quantity;
              },
              0
            );
          }
          this.footerData.totalOfCost = this.data.reduce((accumulator, obj) => {
            return accumulator + obj.cost;
          }, 0);
        }
        // Ẩn Loader
        this.isShowLoader = false;
      } catch (error) {
        this.isShowLoader = false;
        console.log(error);
      }
    },

    // Thực hiện updateFilter tại cha để tải lại danh sách
    updateFilter: function (field, value) {
      try {
        // Cập nhật startIndex
        if (field == Resource.Filter.offset) this.startIndex = value;
        // Thực hiện hàm updateFilter tại Vue cha
        this.$parent.updateFilter(field, value);
      } catch (error) {
        console.log(error);
      }
    },

    // Cập nhật Tổng số bản ghi
    updateLimit: function (totalOfRecords) {
      try {
        this.numberOfRecords = totalOfRecords;
      } catch (error) {
        console.log(error);
      }
    },

    // Cập nhật trang số được chọn
    updatePageNumber: function () {
      try {
        this.$parent.updateFilter;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description làm mới trạng thái của tất cả các dòng
     * @author NVThinh 5/1/2023
     */
    toggle: function () {
      this.isRefreshTable = !this.isRefreshTable;
    },

    /**
     * @description focus vào dòng đầu tiên của bảng
     * @author NVThinh 13/1/2023
     */
    focusFirstRow: function () {
      console.log(typeof this.$refs.tableRow);
      // highlight trên giao diện
      this.$refs.tableRow[0].onActive();
      // Thêm vào mảng các dòng được chọn
      this.selectedRows.push(this.data[0]);
      // Truyền mảng các dòng được chọn lên component cha
      this.$emit("update-row", this.selectedRows);
    },
  },

  data() {
    return {
      // Variables
      ths: [], // object chứa tên cột
      startIndex: 0, // chỉ số bắt đầu của số thứ tự
      numberOfRecords: 0, // Tổng số bản ghi
      isCheckAll: false, // Trạng thái check tất cả
      isRefreshTable: false, // Trạng thái làm mới bảng khi tải lại trang
      checkedHeader: false, // Trạng thái check ô checkbox tại header table
      selectedRows: [], // Mảng chứa các dòng được chọn
      // Các dữ liệu tổng tại chân bảng
      footerData: {},
      // Resource
      Resource,
      TableResource,
      pages: TableResource.TableFoot.Page,
    };
  },
};
</script>

<style scoped>
@import url(./table.css);

/* Row -------------------- */
.ignoreRow {
  height: 100%;
  text-align: center;
  border: none;
}

.ignoreRow:hover {
  background-color: #fff;
}

/* Checkbox ---------------- */
.checkbox__wrapper {
  position: relative;
  width: 50px;
  text-align: center;
}

/* th ----------------------- */
th {
  padding: 0 8px;
}

/* Track */
::-webkit-scrollbar-track {
  margin-top: 39px;
  margin-bottom: 39px;
}
</style>