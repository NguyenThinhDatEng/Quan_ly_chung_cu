import { ref, onMounted, reactive } from "vue";
// enum
import ServiceUnit from "@/commons/enum/ServiceUnit";
// resources
import Resource from "@/commons/resource";
// functions
import CommonFunction from "@/commons/commonFunction";

export const usServiceList = () => {
  const tableData = ref([
    {
      serviceCode: "S0001",
      serviceName: "Điện",
      price: 3800,
      unit: ServiceUnit.Number,
    },
    {
      serviceCode: "S0002",
      serviceName: "Nước",
      price: 8509,
      unit: ServiceUnit.CubicMeter,
    },
    {
      serviceCode: "S0003",
      serviceName: "Vệ sinh",
      price: 100000,
      unit: ServiceUnit.OnePersonOneMonth,
    },
  ]);

  const propsData = reactive([
    {
      prop: "serviceCode",
      label: "Mã dịch vụ",
      sortable: true,
      width: 200,
      align: "center",
    },
    {
      prop: "serviceName",
      label: "Loại dịch vụ",
    },
    {
      prop: "price",
      label: "Mức giá",
      width: 200,
      align: "right",
    },
    {
      prop: "unit",
      label: "Đơn vị",
      width: 200,
    },
  ]);

  onMounted(() => {
    const mapping = CommonFunction.mappingEnumWithResource(
      ServiceUnit,
      Resource.ServiceUnit
    );
    tableData.value = tableData.value.map((item) => {
      return { ...item, unit: mapping[item.unit] };
    });
  });

  const detailForm = "ServiceDetail";

  return { tableData, propsData, detailForm };
};
