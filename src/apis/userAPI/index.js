import BaseAPI from "@/apis/baseAPI";

const END_POINT = "User/";

class UserAPI extends BaseAPI {
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
      const res = this.postAsync(user, "Register");
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  updateUserInfo(user) {
    try {
      const res = this.postAsync(user, "UpdateInformation");
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  changePassword(payload) {
    try {
      const res = this.postAsync(payload, "ChangePassword");
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserAPI();
