<template>
  <el-table
    ref="grid"
    style="width: 100%"
    :lazy="true"
    :show-overflow-tooltip="true"
    :flexible="true"
    :default-sort="{ prop: 'date', order: 'descending' }"
    :data="tableData"
    :border="border"
    :stripe="stripe"
    highlight-current-row
    :max-height="maxHeight"
    :show-summary="showSummary"
    :summary-method="getSummaries"
    :table-layout="tableLayout"
    :header-cell-class-name="getHeaderCellClassNameDefault"
    v-loading="loading"
    @current-change="handleCurrentChange"
  >
    <template #empty> <el-empty description="Không có dữ liệu" /> </template>
    <el-table-column v-if="multiple" type="selection" width="55" />
    <el-table-column
      v-if="isDisplayRowIndex"
      type="index"
      label="STT"
      align="center"
      :width="showSummary ? 70 : 60"
    />
    <el-table-column
      v-for="item in propsData"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      :align="item.align"
      :sortable="item.sortable"
    >
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon v-if="item.iconName != null"
            ><component :is="item.iconName"
          /></el-icon>
          <!-- <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span> -->
          <span style="margin-left: 10px">{{
            renderData(scope.row, item)
          }}</span>
        </div>
      </template>
    </el-table-column>
    <!-- Cột tính năng -->
    <el-table-column
      v-if="isShowFeatureCol"
      prop="feature"
      fixed="right"
      label="Tính năng"
      align="center"
      :width="featureColWidth"
    >
      <template #default="scope">
        <slot name="btn-before" />
        <el-button
          type="primary"
          plain
          size="small"
          @click="handleEdit(scope.$index, scope.row)"
          >Xem/Sửa</el-button
        >
        <el-button
          type="danger"
          size="small"
          @click="handleDelete(scope.$index, scope.row)"
          >Xóa</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// library
import { getCurrentInstance, ref } from "vue";
import moment from "moment";
// component
import { Timer } from "@element-plus/icons-vue";
// resources
import _enum from "@/commons/enum";
import _i18n from "@/i18n/enum/index.js";

export default {
  name: "TGridViewer",
  components: {
    Timer,
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    propsData: {
      type: Object,
      default: () => ({}),
    },
    // Đan xen màu giữa các dòng
    stripe: {
      type: Boolean,
      default: true,
    },
    // Ẩn/hiện border của bảng
    border: {
      type: Boolean,
      default: true,
    },
    // Ẩn/hiện cột chức năng
    isShowFeatureCol: {
      type: Boolean,
      default: true,
    },
    isDisplayRowIndex: {
      type: Boolean,
      default: true,
    },
    showSummary: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    getHeaderCellClassName: {
      type: Function,
      default: () => {
        return [];
      },
    },
    maxHeight: {
      type: [Number, String],
      default: 600,
    },
    featureColWidth: {
      type: Number,
      default: 180,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["handle-edit", "handle-delete"],
  setup(props) {
    const { proxy } = getCurrentInstance();
    // ['fixed', 'auto']
    const tableLayout = ref("fixed");

    const currentRow = ref();
    const handleCurrentChange = (val) => {
      currentRow.value = val;
    };

    const renderData = (data, column) => {
      const me = proxy;
      if (Object.keys(data).length > 0) {
        switch (column.columnType) {
          case _enum.Table.ColumnType.date:
            return moment(data).format("DD/MM/YYYY");
          case _enum.Table.ColumnType.enum:
            return me.formatEnum(data, column);
          default:
            return data[column.prop];
        }
      }
      return data[column.prop];
    };

    const formatEnum = (data, column) => {
      const val = _enum[column.enum];

      let arr = [];

      for (const key in val) {
        if (val.hasOwnProperty(key)) {
          const enumValue = val[key];
          const enumText = _i18n[column.enum][key];

          const itemEnum = {
            Key: key,
            Value: enumValue,
            Text: enumText,
          };

          arr.push(itemEnum);
        }
      }

      if (arr?.length > 0) {
        const value = arr.find((x) => x.Value == data[column.prop]);
        if (value) {
          return value.Text;
        } else {
          return "";
        }
      }
      return "";
    };

    const handleEdit = (index, row) => {
      const me = proxy;
      handleCurrentChange(index);
      me.$emit("handle-edit", { row });
    };

    const handleDelete = (index, row) => {
      const me = proxy;
      handleCurrentChange(index);
      me.$emit("handle-delete", { row });
    };

    const getSummaries = (param) => {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "Sum";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => Number.isNaN(value))) {
          sums[index] = `${values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!Number.isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0)}`;
        } else {
          sums[index] = "";
        }
      });

      return sums;
    };

    const getHeaderCellClassNameDefault = ({ column }) => {
      let classes = [];
      // custom from parent component
      if (typeof props.getHeaderCellClassName == "function") {
        const customClasses = props.getHeaderCellClassName({ column });
        if (customClasses && customClasses.length > 0) {
          classes.concat(customClasses);
        }
      }
      return classes;
    };

    return {
      handleCurrentChange,
      handleEdit,
      handleDelete,
      getSummaries,
      tableLayout,
      getHeaderCellClassNameDefault,
      renderData,
      formatEnum,
    };
  },
};
</script>

<style lang="scss">
.el-table {
  thead {
  }

  tbody {
    .el-table__cell {
      span {
        width: 100%;
      }
    }
  }
}
</style>