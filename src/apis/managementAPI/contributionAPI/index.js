import BaseAPI from "@/apis/baseAPI";

const END_POINT = "Contribution/";
class ContributionAPI extends BaseAPI {
  constructor() {
    super(END_POINT); // Gọi constructor của lớp cha
  }
}

export default new ContributionAPI();
