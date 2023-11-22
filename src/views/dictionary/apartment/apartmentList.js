import { ref, onMounted, reactive } from "vue";

export const usApartmentList = () => {
  const item = {
    apartmentCode: "M01",
    area: 120,
    price: 10000000,
    status: false,
    noOfRooms: 3,
  };
  const tableData = ref(
    Array.from({ length: 20 })
      .fill(item)
      .map((data, i) => ({ ...data, key: i }))
  );

  const propsData = reactive([
    {
      prop: "apartmentCode",
      label: "Mã căn hộ",
      sortable: true,
    },
    {
      prop: "area",
      label: "Diện tích",
      sortable: true,
      width: 200,
      align: "center",
    },
    {
      prop: "price",
      label: "Giá",
      width: 200,
      align: "right",
    },
    {
      prop: "status",
      label: "Trạng thái",
      width: 200,
      align: "center",
    },
    {
      prop: "noOfRooms",
      label: "Số phòng",
      width: 200,
      align: "center",
    },
  ]);

  onMounted(() => {
    // for (const [key, value] of Object.entries(i18nFundType)) {
    //   propsData.push({ prop: key, label: value, width: 170, align: "right" });
    // }
  });

  const detailForm = "ApartmentDetail";

  return { tableData, propsData, detailForm };
};
