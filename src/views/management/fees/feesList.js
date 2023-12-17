import { ref, onMounted, reactive, getCurrentInstance } from "vue";

export const useFeesList = () => {
  const { proxy } = getCurrentInstance();
  const detailForm = "FeesDetail";

  const propsData = reactive([
    {
      prop: "apartmentCode",
      label: "Mã căn hộ",
      sortable: true,
      align: "center",
      width: 120,
    },
    {
      prop: "residentCode",
      label: "Mã chủ căn hộ",
      sortable: true,
      align: "center",
      width: 150,
    },
    {
      prop: "residentName",
      label: "Tên chủ căn hộ",
      sortable: true,
      minWidth: 155,
    },
    {
      prop: "description",
      label: "Ghi chú",
    },
    {
      prop: "fromDate",
      label: "Từ ngày",
      width: 120,
      align: "center",
    },
    {
      prop: "toDate",
      label: "Đến ngày",
      width: 120,
      align: "center",
    },
    {
      prop: "amount",
      label: "Tổng tiền",
      width: 120,
      align: "right",
    },
    {
      prop: "status",
      label: "Trạng thái",
      width: 150,
      align: "center",
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

  onMounted(() => {});

  return { propsData, detailForm, pay };
};
