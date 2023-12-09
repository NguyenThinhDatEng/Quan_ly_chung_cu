import { reactive, getCurrentInstance } from "vue";
// resources
import commonFn from "@/commons/commonFunction";

export const useLogin = () => {
  const { proxy } = getCurrentInstance();
  const submitForm = () => {
    const me = proxy;
    sessionStorage.setItem("userId", commonFn.uuidv4());
    me.$router.push({ name: "Overview", replace: true });
  };

  const model = reactive({});

  return { submitForm, model };
};
