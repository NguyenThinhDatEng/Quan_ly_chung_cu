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
    @current-change="handleCurrentChange"
  >
    <el-table-column v-if="multiple" type="selection" width="55" />
    <el-table-column
      v-if="isDisplayRowIndex"
      type="index"
      label="STT"
      :width="showSummary ? 60 : 50"
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
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </div>
      </template>
    </el-table-column>
    <!-- Cột tính năng -->
    <el-table-column
      v-if="isShowFeatureCol"
      prop="feature"
      fixed="right"
      label="Tính năng"
      width="180"
    >
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
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
import { getCurrentInstance, ref } from "vue";
import { Timer } from "@element-plus/icons-vue";

export default {
  name: "GridViewer",
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
  },
  emits: ["handle-edit"],
  setup(props) {
    const { proxy } = getCurrentInstance();
    // ['fixed', 'auto']
    const tableLayout = ref("fixed");

    const currentRow = ref();
    const handleCurrentChange = (val) => {
      currentRow.value = val;
    };

    const handleEdit = (index, row) => {
      const me = proxy;
      handleCurrentChange(index);
      me.$emit("handle-edit", { row });
    };

    const handleDelete = (index, row) => {
      console.log(row);
      handleCurrentChange(index);
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
      if (column.property == "feature") {
        classes.push("text-center");
      }
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
    };
  },
};
</script>

<style lang="scss">
.el-table {
  thead {
    .text-center {
      .cell {
        text-align: center;
      }
    }
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