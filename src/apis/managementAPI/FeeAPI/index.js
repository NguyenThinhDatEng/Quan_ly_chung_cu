import BaseAPI from "@/apis/baseAPI";

const END_POINT = "Fee/";
class FeeAPI extends BaseAPI {
  constructor() {
    super(END_POINT); // Gọi constructor của lớp cha
  }

  // generateFees() {
  //   return await
  // }
}

export default new FeeAPI();
