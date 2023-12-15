import BaseAPI from "@/apis/baseAPI";

class ServiceAPI extends BaseAPI {
  END_POINT = "Service/";

  constructor() {
    super(END_POINT); // Gọi constructor của lớp cha
  }
}

export default new ServiceAPI();
