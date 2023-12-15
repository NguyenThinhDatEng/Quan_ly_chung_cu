import BaseAPI from "@/apis/baseAPI";

class ServiceAPI extends BaseAPI {
  END_POINT = "User/";

  constructor() {
    super(END_POINT); // Gọi constructor của lớp cha
  }

  /**
   * API đăng nhập
   * @params user is an object, include
   * @returns res is a promise
   */
  login(user) {
    try {
      const res = this.postAsync(user, "Login");
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * API đăng ký
   * @params user is an object, include
   * @returns res is a promise
   */
  register(user) {
    try {
      const res = httpClient.post(user, "Register");
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ServiceAPI();
