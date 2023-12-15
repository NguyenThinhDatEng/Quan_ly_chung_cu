import BaseAPI from "@/apis/baseAPI";

const END_POINT = "Service/";
class ServiceAPI extends BaseAPI {
  constructor() {
    super(END_POINT); // Gọi constructor của lớp cha
  }
}

export default new ServiceAPI();
