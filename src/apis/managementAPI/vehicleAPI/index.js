import BaseAPI from "@/apis/baseAPI";

const END_POINT = "Vehicle/";
class VehicleAPI extends BaseAPI {
  constructor() {
    super(END_POINT); // Gọi constructor của lớp cha
  }
}

export default new VehicleAPI();
