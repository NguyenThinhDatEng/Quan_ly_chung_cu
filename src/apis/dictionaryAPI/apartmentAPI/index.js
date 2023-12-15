import BaseAPI from "@/apis/baseAPI";

const END_POINT = "Apartment/";
class ApartmentAPI extends BaseAPI {
  constructor() {
    super(END_POINT); // Gọi constructor của lớp cha
  }
}

export default new ApartmentAPI();
