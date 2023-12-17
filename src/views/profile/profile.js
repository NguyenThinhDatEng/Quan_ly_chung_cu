import { getCurrentInstance, onMounted, reactive, ref } from "vue";
// api
import UserAPI from "@/apis/userAPI";
// Enum
import _enum from "@/commons/enum";
// components
import { ElMessage } from "element-plus";

export const useProfile = () => {
  const { proxy } = getCurrentInstance();
  const model = reactive({
    name: "",
    phoneNumber: "",
    bankName: "",
    bankAccountNumber: "",
    zalo: "",
    facebookLink: "",
  });

  const oldModel = ref({});

  const viewing = ref(true);
  const loading = ref(false);

  const changePassword = () => {};

  const submit = async () => {
    const me = proxy;
    try {
      loading.value = true;
      const res = await UserAPI.updateUserInfo(model);
      if (res?.status == _enum.APIStatus.Ok) {
        const newUserInfo = res.data?.entity;
        if (newUserInfo) {
          // Cập nhật sesion
          const userInfoCurrent = sessionStorage.getItem("userInfo");
          if (userInfoCurrent) {
            let userInfoObj = JSON.parse(userInfoCurrent);
            Object.keys(newUserInfo).forEach((field) => {
              // Cập nhật session
              userInfoObj[field] = newUserInfo[field];
              // Cập nhật model
              me.model[field] = newUserInfo[field];
            });
            // Lưu thông tin người dùng vào session
            sessionStorage.setItem("userInfo", JSON.stringify(userInfoObj));
            // Cập nhật old model
            oldModel.value = { ...me.model };
          }

          ElMessage({
            message: "Cập nhật thông tin thành công",
            type: "success",
          });
        }
      } else {
        ElMessage.error("Có lỗi xảy ra!");
      }
    } catch (error) {
      console.log(error);
      ElMessage.error("Có lỗi xảy ra!");
    } finally {
      loading.value = false;
    }
  };

  const cancel = () => {
    const me = proxy;

    // Reset model
    Object.keys(me.model).forEach((field) => {
      me.model[field] = oldModel.value[field];
    });
  };

  const back = () => {
    proxy.$router.go(-1);
  };

  const blur = () => {
    proxy.model.zalo = proxy.model.phoneNumber;
  };

  const edit = () => {
    viewing.value = false;
  };

  onMounted(() => {
    const me = proxy;

    window._userInfo = me;

    const userInfoCurrent = sessionStorage.getItem("userInfo");
    if (userInfoCurrent) {
      const userInfoObj = JSON.parse(userInfoCurrent);
      Object.keys(me.model).forEach((field) => {
        me.model[field] = userInfoObj[field];
      });
      // set value to old model
      oldModel.value = { ...me.model };
    }
  });

  return {
    changePassword,
    model,
    viewing,
    submit,
    cancel,
    back,
    blur,
    loading,
    edit,
  };
};
