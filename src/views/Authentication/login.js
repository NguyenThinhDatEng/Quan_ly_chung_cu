import { reactive, computed, ref, getCurrentInstance } from "vue";
import UserAPI from "../../apis/userAPI";
import _enum from "../../commons/enum";
// Component
import { ElMessage } from "element-plus";

export const useLogin = () => {
  const { proxy } = getCurrentInstance();
  const submitForm = async () => {
    const me = proxy;
    loading.value = true;

    let res = null;
    try {
      if (isRegisterForm.value) {
        res = await UserAPI.register(model);
      } else {
        res = await UserAPI.login(model);
      }
      if (res?.status == _enum.APIStatus.Ok) {
        const response = res.data;
        if (response?.token || response?.code != -1) {
          let message = "";
          if (isRegisterForm.value) {
            message = "Đăng ký";
            isRegisterForm.value = false;
            me.model.usernameOrEmail = model.username;
          } else {
            message = "Đăng nhập";
            // Lưu token vào session
            sessionStorage.setItem("userToken", res.data?.token ?? "register");
            // Lưu thông tin người dùng vào session
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify(res.data?.entity)
            );
            // Chuyển về trang tổng quan
            me.$router.push({ name: "Overview", replace: true });
          }

          ElMessage({ message: message + " thành công", type: "success" });
        } else {
          if (response?.message) {
            ElMessage({ message: response.message, type: "warning" });
          }
        }
      }
    } catch (error) {
      console.log(error);
      ElMessage.error("Có lỗi xảy ra!");
    } finally {
      loading.value = false;
    }
  };

  const model = reactive({});
  const resetModel = () => {
    delete model.password;
    delete model.email;
  };

  const isRegisterForm = ref(false);
  const toggleForm = () => {
    isRegisterForm.value = !isRegisterForm.value;

    resetModel();

    if (isRegisterForm.value) {
      model.email = "";
    }
  };

  const title = computed(() => {
    return {
      form: isRegisterForm.value
        ? "Đăng ký tài khoản"
        : "Đăng nhập để tiếp tục",
      submitBtn: isRegisterForm.value ? "Đăng ký" : "Đăng nhập",
      sub: isRegisterForm.value
        ? "Đã có tài khoản? Đăng nhập tại đây"
        : "Chưa có tài khoản? Đăng ký tại đây",
    };
  });

  const loading = ref(false);

  return { submitForm, model, toggleForm, isRegisterForm, title, loading };
};
