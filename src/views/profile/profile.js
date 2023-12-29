import { getCurrentInstance, onMounted, reactive, ref, computed } from "vue";
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
    zaloLink: "",
    facebookLink: "",
  });

  const oldModel = ref({});

  const viewing = ref(true);

  const loading = ref(false);

  const changePassword = () => {
    const me = proxy;

    const detailForm = "ChangePassword";
    const param = {
      detailForm,
    };

    me.$vfm.show({ component: detailForm }, param).then(() => {
      // do something on modal opened
      console.log(detailForm);
    });
  };

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
      if (error.response?.status == _enum.APIStatus.BadRequest) {
        // show toast
        ElMessage({
          message: "Thông tin không hợp lệ. Vui lòng kiểm tra lại",
          type: "warning",
        });
      } else {
        ElMessage.error("Có lỗi xảy ra!");
      }
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

    viewing.value = true;
  };

  const back = () => {
    proxy.$router.go(-1);
  };

  const blur = () => {
    proxy.model.zaloLink = proxy.model.phoneNumber;
  };

  const edit = () => {
    viewing.value = false;
  };

  const userInfo = computed(() => {
    const sessionItem = sessionStorage.getItem("userInfo");
    if (sessionItem && typeof sessionItem == "string") {
      return JSON.parse(sessionItem);
    }

    return {};
  });

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
    userInfo,
  };
};
