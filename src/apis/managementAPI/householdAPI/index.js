import BaseAPI from "@/apis/baseAPI";

const END_POINT = "Household/";
class HouseholdAPI extends BaseAPI {
  constructor() {
    super(END_POINT); // Gọi constructor của lớp cha
  }
}

export default new HouseholdAPI();
