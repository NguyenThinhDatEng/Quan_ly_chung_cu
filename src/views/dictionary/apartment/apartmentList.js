import { ref, onMounted, reactive } from "vue";

export const usApartmentList = () => {
  const tableData = ref([
    {
      apartmentCode: "M01",
      area: 120,
      price: 10000000,
      status: false,
      noOfRooms: 3,
    },
    {
      apartmentCode: "M02",
      area: 200,
      price: 19000000,
      status: false,
      noOfRooms: 3,
    },
    {
      apartmentCode: "M05",
      area: 100,
      price: 10000000,
      status: true,
      noOfRooms: 2,
    },
  ]);

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
