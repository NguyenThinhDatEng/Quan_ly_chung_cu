import BaseAPI from "@/apis/baseAPI";

const END_POINT = "Management/";
class ResidentAPI extends BaseAPI {
  constructor() {
    super(END_POINT); // Gọi constructor của lớp cha
  }
}

export default new ResidentAPI();
