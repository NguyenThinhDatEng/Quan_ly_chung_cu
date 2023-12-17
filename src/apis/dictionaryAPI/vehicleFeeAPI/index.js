import BaseAPI from "@/apis/baseAPI";

const END_POINT = "VehicleType/";
class VehicleTypeAPI extends BaseAPI {
  constructor() {
    super(END_POINT); // Gọi constructor của lớp cha
  }
}

export default new VehicleTypeAPI();
