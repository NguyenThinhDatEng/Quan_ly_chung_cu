import { onMounted, reactive, getCurrentInstance } from "vue";
// store
import feeStore from "@/stores/views/feeStore";
// components
import { ElMessage } from "element-plus";
// enum
import _enum from "@/commons/enum";
// i18n
import i18nTag from "@/i18n/enum/i18nTag";

export const useFeesList = () => {
  const { proxy } = getCurrentInstance();
  const detailForm = "FeesDetail";

  const store = feeStore;

  const propsData = reactive([
    {
      prop: "apartmentCode",
      label: "Mã căn hộ",
      sortable: true,
      minWidth: 100,
    },
    {
      prop: "ownerCode",
      label: "Mã chủ hộ",
      sortable: true,
      minWidth: 100,
    },
    {
      prop: "ownerName",
      label: "Tên chủ hộ",
      sortable: true,
      minWidth: 110,
    },
    {
      prop: "note",
      label: "Ghi chú",
    },
    {
      prop: "fromDate",
      label: "Từ ngày",
      width: 120,
      align: "center",
    },
    {
      prop: "expiredDate",
      label: "Đến ngày",
      width: 120,
      align: "center",
      columnType: _enum.Table.ColumnType.date,
    },
    {
      prop: "electricityFee",
      label: "Tiền điện",
      width: 110,
      align: "right",
    },
    {
      prop: "waterFee",
      label: "Tiền nước",
      width: 110,
      align: "right",
    },
    {
      prop: "totalFee",
      label: "Tổng tiền",
      width: 120,
      align: "right",
    },
    {
      prop: "status",
      label: "Trạng thái",
      width: 120,
      align: "center",
      enum: "PaymentStatus",
      columnType: _enum.Table.ColumnType.enum,
      tags: [i18nTag.Warning, i18nTag.Danger, i18nTag.Success],
    },
  ]);

  const pay = () => {
    const me = proxy;

    const param = {};
    me.$vfm.show({ component: "PaymentDetail" }, param).then(() => {
      // do something on modal opened
      console.log("PaymentDetail");
    });
  };

  const autoGenerateFees = async () => {
    const me = proxy;
    try {
      const res = await me.store.state.api.postAsync();
      // Show result
      if (
        res?.status == _enum.APIStatus.Ok &&
        res?.data?.code == _enum.APICode.Success
      ) {
        // update store
        me.store.commit("insert", res.data.entity);
        // show toast
        ElMessage({
          message: "Sinh dữ liệu thành công",
          type: "success",
        });
      } else {
        if (res?.data?.code == _enum.APICode.Fail) {
          ElMessage.error(res.data.message);
        } else {
          ElMessage.error("Có lỗi xảy ra!");
        }
      }
    } catch (error) {
      console.log(error);
      ElMessage.error("Có lỗi xảy ra phía Client!");
    }
  };

  onMounted(() => {});

  return { propsData, detailForm, pay, store, autoGenerateFees };
};
