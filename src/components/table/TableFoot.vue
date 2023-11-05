<template>
  <tfoot class="table__footer">
    <!-- Voucher -->
    <!-- Footer 01 -->
    <tr v-if="page === pages.voucher" id="voucher" class="totals">
      <td colspan="5" />
      <td id="totalOfCost">
        {{ Function.formatMoney(footerData.totalOfCost) }}
      </td>
      <td></td>
    </tr>
    <!-- Footer 02 -->
    <tr v-else-if="page === pages.voucher_detail" class="totals">
      <td colspan="4" />
      <!-- totals -->
      <td class="value" v-for="(val, key) of footerData" :key="key">
        {{ Function.formatMoney(val) }}
      </td>
    </tr>
    <!-- Fixed Asset -->
    <tr v-if="page === pages.fixedAsset || page === pages.fixedAssetDetail">
      <td :colspan="page === pages.fixedAsset ? 6 : 4">
        <div class="footer__left">
          <div class="total-of-records__wrapper">
            <p class="total-of-records" v-html="records()"></p>
          </div>
          <!-- Combobox: Limit of records  -->
          <ComboboxPagingVue :title="Resource.Title.limit"></ComboboxPagingVue>
          <!-- Paging  -->
          <div class="paging">
            <div class="paging__icon--wrapper" @click="backPreviousPage()">
              <div
                :class="[
                  'icon center icon-footer icon--left-arrow',
                  { 'icon--disable': selectedNumber == 1 },
                ]"
                :title="Resource.PageNumber.prePage"
              ></div>
            </div>
            <div class="page-numbers">
              <!-- Trang thứ nhất  -->
              <button
                :class="['number', { 'number--selected': numberState[0] }]"
                @click="handleOnClickPageNumber(1)"
              >
                1
              </button>
              <!-- ... -->
              <span class="number" v-show="isShowFirstThreeDots()">...</span>

              <!-- Trang trước -->
              <button
                :title="Resource.PageNumber.prePage"
                :class="[
                  'number',
                  {
                    'number--selected':
                      numberState[prePageNumber() - 1] && selectedNumber <= 2,
                  },
                ]"
                v-show="isShowPrePage()"
                @click="handleOnClickPageNumber(prePageNumber())"
              >
                {{ prePageNumber() }}
              </button>

              <!-- Trang giữa -->
              <button
                :title="Resource.PageNumber.currentPage"
                :class="[
                  'number',
                  {
                    'number--selected': numberState[pageNumber() - 1],
                  },
                ]"
                v-show="isShowCurrentPage()"
                @click="handleOnClickPageNumber(pageNumber())"
              >
                {{ pageNumber() }}
              </button>

              <!-- Trang sau -->
              <button
                :title="Resource.PageNumber.nextPage"
                :class="[
                  'number',
                  {
                    'number--selected':
                      numberState[nextPageNumber() - 1] &&
                      selectedNumber >= numberOfPages - 1,
                  },
                ]"
                v-show="isShowNextPage()"
                @click="handleOnClickPageNumber(nextPageNumber())"
              >
                {{ nextPageNumber() }}
              </button>

              <!-- ...  -->
              <span class="number" v-show="isShowSecondThreeDots()">...</span>

              <!-- Trang cuối cùng  -->
              <button
                :class="[
                  'number',
                  {
                    'number--selected': numberState[numberOfPages - 1],
                  },
                ]"
                v-show="numberOfPages > 1"
                @click="handleOnClickPageNumber(numberOfPages)"
              >
                {{ numberOfPages }}
              </button>
            </div>
            <div class="paging__icon--wrapper" @click="goNextPage()">
              <div
                :class="[
                  'icon center icon-footer icon--right-arrow',
                  { 'icon--disable': selectedNumber == numberOfPages },
                ]"
                :title="Resource.PageNumber.nextPage"
              ></div>
            </div>
          </div>
        </div>
      </td>
      <!-- totals -->
      <td class="value" v-for="(val, key) of footerData" :key="key">
        {{ Function.formatMoney(val) }}
      </td>
      <!-- empty table data -->
      <td v-if="page === pages.fixedAsset"></td>
    </tr>
  </tfoot>
</template>

<script>
// Resources
import Resource from "@/commons/resource";
import Function from "@/commons/commonFunction";
import TableResource from "@/commons/resource/tableResource";
// Components
import ComboboxPagingVue from "../combobox/ComboboxPaging.vue";

export default {
  name: "TableFoot",
  components: { ComboboxPagingVue },
  props: {
    footerData: Object, // Đối tượng chứa tổng của các cột tiền
    numberOfRecords: Number, // tổng số lượng bản ghi
    page: String, // loại trang giúp xác định kiểu footer
  },

  created() {
    try {
      // Thêm thuộc tính isSelected vào mảng
      for (let i = 0; i < 100; i++) this.numberState.push(false);
      // Trang đầu tiên auto được lựa chọn
      this.numberState[0] = true;
    } catch (error) {
      console.log(error);
    }
  },

  watch: {
    // Cập nhật số trang khi tổng số bản ghi thay đổi
    numberOfRecords: function () {
      this.setNumberOfPages();
      // Cập nhật giá trị và style trang được chọn
      this.updatePageNumberState();
    },

    // Gửi dữ liệu để call API filter khi trang được chọn thay đổi
    selectedNumber: function () {
      try {
        this.$parent.updateFilter(
          Resource.Filter.offset,
          (this.selectedNumber - 1) * this.pageSize
        );
      } catch (error) {
        console.log();
      }
    },
  },

  methods: {
    /**
     * trả về thông tin số bản ghi thu được render bằng v-html
     * @return String kiểu html
     * @author Nguyen Van Thinh 02/11/2022
     */
    records() {
      return (
        "Tổng số: " +
        "<b>" +
        Function.formatMoney(this.numberOfRecords) +
        "</b>" +
        " bản ghi"
      );
    },

    // Thực hiện updateLimit tại cha để gửi giá trị vừa được cập nhật
    updateFilter(value) {
      try {
        // Cập nhật số lượng bản ghi / trang
        this.pageSize = value;
        // Cập nhật số trang
        this.setNumberOfPages();
        // Cập nhật giá trị và style trang được chọn
        this.updatePageNumberState();
        // Thực hiện hàm updateFilter tại lớp cha
        this.$parent.updateFilter(Resource.Filter.limit, value);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Bỏ focus vào ô page number hiện tại, focus vào page number đầu tiên
     * @author NVThinh 19-11-2022
     */
    updatePageNumberState: function () {
      try {
        this.numberState[this.selectedNumber - 1] = false;
        this.selectedNumber = 1;
        this.numberState[0] = true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * sự kiện click vào icon mũi tên bên phải
     * @author NVThinh 25/11/2022
     */
    goNextPage: function () {
      try {
        if (this.selectedNumber < this.numberOfPages) {
          // Thay đổi trạng thái focus của các trang
          this.numberState[this.selectedNumber - 1] = false;
          this.numberState[this.selectedNumber] = true;
          this.selectedNumber++;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * sự kiện click vào icon mũi tên bên trái
     * @author NVThinh 25/11/2022
     */
    backPreviousPage: function () {
      try {
        if (this.selectedNumber > 1) {
          // Thay đổi trạng thái focus của các trang
          this.numberState[this.selectedNumber - 1] = false;
          this.numberState[this.selectedNumber - 2] = true;
          this.selectedNumber--;
        }
      } catch (error) {
        console.log(error);
      }
    },

    // Thiết lập giá trị hiển thị ở ô phân trang trước
    prePageNumber: function () {
      try {
        if (this.selectedNumber < 3) {
          return 2;
        } else {
          return this.selectedNumber - 1;
        }
      } catch (error) {
        console.log(error);
      }
    },

    // Thiết lập giá trị hiển thị ở ô phân trang giữa
    pageNumber: function () {
      try {
        if (this.selectedNumber < this.numberOfPages - 1) {
          return this.prePageNumber() + 1;
        } else {
          return this.numberOfPages - 2;
        }
      } catch (error) {
        console.log(error);
      }
    },

    // Thiết lập giá trị hiển thị ở ô phân trang sau
    nextPageNumber: function () {
      try {
        if (this.selectedNumber < this.numberOfPages) {
          if (this.selectedNumber < this.numberOfPages - 1) {
            return this.pageNumber() + 1;
          } else {
            return this.selectedNumber;
          }
        } else {
          return this.numberOfPages - 1;
        }
      } catch (error) {
        console.log(error);
      }
    },

    // Cập nhật số trang
    setNumberOfPages: function () {
      const roundedValue = Math.floor(this.numberOfRecords / this.pageSize);
      // Nếu chia dư -> số trang sẽ + 1
      if (this.numberOfRecords % this.pageSize > 0)
        this.numberOfPages = roundedValue + 1;
      else {
        this.numberOfPages = roundedValue;
      }
    },

    /**
     * Sự kiện click vào trang số 1
     * @author NVThinh 25/11/2022
     */
    handleOnClickPageNumber: function (pageNumber) {
      try {
        // Bỏ trạng thái focus của ô hiện tại
        this.numberState[this.selectedNumber - 1] = false;
        // Cập nhật giá trị và trạng thái ô phân trang
        this.selectedNumber = pageNumber;
        this.numberState[pageNumber - 1] = true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Kiểm tra trạng thái ẩn hiện dấu 3 chấm đằng sau
     * @author NVThinh 25/11/2022
     */
    isShowFirstThreeDots: function () {
      try {
        if (this.numberOfPages == 4 && this.selectedNumber >= 3) {
          return true;
        }
        if (this.numberOfPages > 4 && this.selectedNumber > 3) {
          return true;
        }
        return false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Kiểm tra trạng thái ẩn hiện dấu 3 chấm đằng trước
     * @author NVThinh 25/11/2022
     */
    isShowSecondThreeDots: function () {
      try {
        if (
          this.numberOfPages > 4 &&
          this.selectedNumber < this.numberOfPages - 2
        )
          return true;
        if (this.numberOfPages == 4 && this.selectedNumber < 3) return true;
        return false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Kiểm tra trạng thái ẩn hiện số của trang trước
     * @author NVThinh 25/11/2022
     */
    isShowPrePage: function () {
      try {
        if (this.numberOfPages == 3) return true;
        if (this.numberOfPages == 4 && this.selectedNumber <= 2) return true;
        if (
          this.numberOfRecords > 4 &&
          this.selectedNumber <= this.numberOfPages - 2
        )
          return true;
        return false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Kiểm tra trạng thái ẩn hiện số của trang giữa
     * @author NVThinh 25/11/2022
     */
    isShowCurrentPage: function () {
      try {
        if (
          this.numberOfPages > 4 &&
          this.selectedNumber > 2 &&
          this.selectedNumber <= this.numberOfPages
        )
          return true;
        return false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Kiểm tra trạng thái ẩn hiện số của trang sau
     * @author NVThinh 25/11/2022
     */
    isShowNextPage: function () {
      try {
        if (this.numberOfPages >= 4 && this.selectedNumber > 2) return true;
        return false;
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      // Variables
      numberOfPages: 1, // số lượng trang
      selectedNumber: 1, // trang được chọn
      numberState: [], // Mảng quản lý số trang đang được chọn
      pageSize: 20, // Số lượng bản ghi / trang
      // Resources
      Resource, // Tài nguyên
      Function, // Hàm dùng chung
      pages: TableResource.TableFoot.Page,
    };
  },
};
</script>

<style scoped>
@import url(@/assets/styles/font.css);

/* Footer */
tfoot {
  position: sticky;
}

.totals {
  background-color: #f5f5f5;
}

/* td */
#totalOfCost {
  text-align: right;
  padding-right: 8px;
  font-family: MISA Bold;
}

td {
  padding-right: 8px;
}

/* Icon */

.icon-footer {
  width: 8px;
  height: 13px;
}

.paging__icon--wrapper + .page-numbers {
  margin-left: 10px;
}

.page-numbers + .paging__icon--wrapper {
  margin-left: 10px;
}

.number + .number {
  margin-left: 7px;
}

.number--selected {
  font-family: MISA Bold;
  background-color: #f5f5f5 !important;
}

.paging__icon--wrapper:hover {
  cursor: pointer;
}

.icon--disable {
  opacity: 0.5;
  cursor: context-menu;
}
</style>