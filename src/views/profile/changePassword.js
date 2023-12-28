import { getCurrentInstance, reactive, ref } from "vue";
// api
import UserAPI from "@/apis/userAPI";
// enum
import _enum from "@/commons/enum";
// components
import { ElMessage } from "element-plus";

export const useChangePassword = () => {
  const { proxy } = getCurrentInstance();

  const model = reactive({
    oldPassword: "",
    newPassword: "",
  });

  const updatePassword = async () => {
    loading.value = true;
    try {
      const res = await UserAPI.changePassword(model);
      if (
        res?.status == _enum.APIStatus.Ok &&
        res?.data?.code == _enum.APICode.Success
      ) {
        // show toast
        ElMessage({
          message: "Cập nhật mật khẩu thành công",
          type: "success",
        });

        hide();
      } else {
        if (res?.data?.code == _enum.APICode.Fail) {
          ElMessage.error(res.data.message);
        } else {
          ElMessage.error("Có lỗi xảy ra!");
        }
      }
    } catch (error) {
      console.log(error);
      ElMessage.error("Có lỗi xảy ra!");
    } finally {
      loading.value = false;
    }
  };

  const hide = () => {
    proxy.$vfm.hide("ChangePassword");
  };

  const loading = ref(false);

  return { model, updatePassword, hide, loading };
};
