import { ref } from "vue";

export const useResidentsDetail = () => {
  const title = ref("Thông tin hộ khẩu, nhân khẩu");
  return { title };
};
