import { ref } from "vue";
import _enum from "@/commons/enum";

export const useResidentsDetail = () => {
  // const { proxy } = getCurrentInstance();

  const title = ref("Thông tin hộ khẩu, nhân khẩu");
  const defaultModel = {
    gender: _enum.Gender.Male,
  };

  return { title, defaultModel };
};
