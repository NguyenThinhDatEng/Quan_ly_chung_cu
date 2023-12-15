import { getCurrentInstance, onMounted, reactive, ref } from "vue";

export const useProfile = () => {
  const { proxy } = getCurrentInstance();
  const model = reactive({});
  const viewing = ref(true);

  const changePassword = () => {};

  const edit = () => {
    viewing.value = false;
  };

  const cancel = () => {
    viewing.value = true;
  };

  onMounted(() => {
    window._tmp = proxy;
  });
  return { changePassword, model, viewing, edit, cancel };
};
