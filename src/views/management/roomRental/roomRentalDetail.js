import { getCurrentInstance, ref } from "vue";
// enum
import _enum from "@/commons/enum";

export const useRoomRentalDetail = () => {
  const { proxy } = getCurrentInstance();

  const title = ref("Thông tin hộ gia đình");

  const residentPropsData = [
    {
      prop: "residentCode",
      label: "Mã cư dân",
      width: 100,
    },
    {
      prop: "name",
      label: "Họ và tên",
      minWidth: 150,
    },
    {
      prop: "phoneNumber",
      label: "Số diện thoại",
      width: 120,
    },
    {
      prop: "cccd",
      label: "Số CMD/CCCD",
      width: 150,
    },
    {
      prop: "gender",
      label: "Giới tính",
      width: 100,
      enum: "Gender",
      columnType: _enum.Table.ColumnType.enum,
    },
    {
      prop: "birthDate",
      label: "Ngày sinh",
      width: 120,
      align: "center",
      columnType: _enum.Table.ColumnType.date,
    },
    {
      prop: "career",
      label: "Nghề nghiệp",
      minWidth: 180,
    },
  ];

  const vehiclePropsData = [
    {
      prop: "name",
      label: "Loại phương tiện",
      minWidth: 150,
    },
    {
      prop: "plate",
      label: "Biển số",
      minWidth: 150,
    },
    {
      prop: "residentCode",
      label: "Mã chủ sở hữu",
      width: 130,
    },
    {
      prop: "residentName",
      label: "Chủ sở hữu",
      minWidth: 150,
    },
  ];

  const tableMaxHeight = 160;

  const addNewVehicle = () => {
    const me = proxy;

    const param = {
      mode: _enum.Mode.Add,
      residentItems: me.model.residentList,
    };
    me.$vfm.show({ component: "VehicleDetail" }, param).then(() => {
      // do something on modal opened
      console.log(me.detailForm);
    });
  };

  return {
    title,
    residentPropsData,
    vehiclePropsData,
    tableMaxHeight,
    addNewVehicle,
  };
};
