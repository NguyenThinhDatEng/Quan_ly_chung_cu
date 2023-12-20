import { getCurrentInstance, ref } from "vue";
// enum
import _enum from "@/commons/enum";
// store
import householdStore from "@/stores/views/householdStore.js";
import vehicleStore from "@/stores/views/vehicleStore";

// components
import { ElMessageBox, ElMessage } from "element-plus";

export const useRoomRentalDetail = () => {
  const { proxy } = getCurrentInstance();

  const store = householdStore;

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
      label: "Kiểu xe",
      minWidth: 120,
    },
    {
      prop: "vehicleType",
      label: "Loại xe",
      minWidth: 120,
    },
    {
      prop: "plate",
      label: "Biển số",
      minWidth: 150,
    },
    {
      prop: "ownerCode",
      label: "Mã chủ sở hữu",
      width: 130,
    },
    {
      prop: "ownerName",
      label: "Chủ sở hữu",
      minWidth: 150,
    },
  ];

  const tableMaxHeight = 40 * 5 + 6;

  const addNewVehicle = () => {
    const me = proxy;

    const param = {
      mode: _enum.Mode.Add,
      residentItems: me.model.residentList,
      detailForm: "VehicleDetail",
      options: {
        updateVehicleList: (newVehicle) => {
          if (newVehicle) {
            // Cập nhật dữ liệu bảng phương tiện
            me.model.vehicleList.unshift(newVehicle);
            // Cập nhật dữ liệu danh sách bên ngoài
            me.store.commit("addVehicle", {
              vehicle: newVehicle,
              apartmentCode: me.model.apartmentCode,
            });
          }
        },
      },
    };
    me.$vfm.show({ component: "VehicleDetail" }, param).then(() => {
      // do something on modal opened
      console.log("VehicleDetail");
    });
  };

  const handleOnDeleteGrid = ({ row }) => {
    const me = proxy;

    ElMessageBox.alert("Bạn có thực sự muốn xóa bản ghi này?", "Xác nhận", {
      // if you want to disable its autofocus
      // autofocus: false,
      confirmButtonText: "Đồng ý",
      showCancelButton: true,
      cancelButtonText: "Hoãn",
      draggable: true,
      callback: async (action) => {
        if (action == _enum.Action.Confirm) {
          try {
            // CALL API
            const res = await vehicleStore.state.api.deleteAsync(row.id);
            // Show result
            if (
              res?.status == _enum.APIStatus.Ok &&
              res?.data?.code == _enum.APICode.Success
            ) {
              const data = res.data.entity;
              // update store
              vehicleStore.commit("delete", data);
              // show toast
              ElMessage({
                message: "Xóa thành công",
                type: "success",
              });
              // Cập nhật danh sách phương tiện
              me.model.vehicleList = me.model.vehicleList.filter(
                (x) => x.id != data.id
              );
              // Cập nhật dữ liệu danh sách bên ngoài
              me.store.commit("deleteVehicle", {
                vehicleList: me.model.vehicleList,
                apartmentCode: me.model.apartmentCode,
              });
            } else {
              if (res?.data?.code == _enum.APICode.Fail) {
                ElMessage.error(res.data.message);
              }
              ElMessage.error("Có lỗi xảy ra!");
            }
          } catch (error) {
            console.log(error);
            ElMessage.error("Có lỗi xảy ra phía Client!");
          }
        }
      },
    });
  };

  return {
    title,
    residentPropsData,
    vehiclePropsData,
    tableMaxHeight,
    addNewVehicle,
    store,
    handleOnDeleteGrid,
  };
};
