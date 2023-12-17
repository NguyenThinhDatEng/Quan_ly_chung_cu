import BaseAPI from "@/apis/baseAPI";

const END_POINT = "ServiceFeeType/";
class ServiceFeeAPI extends BaseAPI {
  constructor() {
    super(END_POINT); // Gọi constructor của lớp cha
  }
}

export default new ServiceFeeAPI();
