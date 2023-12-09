import KeyCode from "./constant/keycode";
import Enum from "./enum";

export default {
  // Định dạng cho dữ liệu kiểu tiền
  formatMoney: function (money) {
    try {
      var formatter = new Intl.NumberFormat("de-DE");
      return formatter.format(Math.round(money));
    } catch (error) {
      console.log(error);
    }
  },

  // Lấy ngày tháng năm hiện tại
  getCurrentDate: function () {
    const date = new Date();
    return date.toISOString();
  },

  // Lấy năm hiện tại
  getCurrentYear: function () {
    let date = new Date();
    return date.getFullYear();
  },

  // Format dữ liệu số
  formatNumber: function (num) {
    try {
      // Kiểm tra là số nguyên
      if (Number.isInteger(num) && num < 10 && num > 0) return "0" + num;
      return num;
    } catch (error) {
      console.log(error);
    }
  },

  // So sánh 2 đối tượng
  isObjectEqual: function (object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }

    return true;
  },

  /**
   * Tìm kiếm những item thỏa mãn điều kiện lọc
   * @param {Array} data mảng dữ liệu cần lọc
   * @param {String} field01 trường thuộc tính cần xét thứ 1
   * @param {String} field02 trường thuộc tính cần xét thứ 2
   * @returns {Array} Mảng giá trị sau khi lọc
   * @author NVThinh 25-11-2022
   */
  autoComplete: function (value, data, field01, field02 = field01) {
    try {
      let filter;
      let resultArr = data.filter((obj) => {
        filter =
          obj[field01].toLowerCase()?.includes(value.toLowerCase()) ||
          obj[field02].toLowerCase()?.includes(value.toLowerCase());
        return filter;
      });
      return resultArr;
    } catch (error) {
      console.log(error);
    }
  },

  // Kiểm tra input đầu vào chỉ có ký tự số
  onlyNumbers: function (e) {
    try {
      // Mã key
      const keyCode = e.keyCode;
      // Lấy mảng các chức năng cơ bản
      let excludedKeys = KeyCode.BasicFeature;
      excludedKeys.push(Enum.KeyCode.Comma);
      // Kiểm tra điều kiện
      if (
        !(
          (keyCode >= 48 && keyCode <= 57) ||
          (keyCode >= 96 && keyCode <= 105) ||
          excludedKeys.includes(keyCode)
        )
      ) {
        e.preventDefault();
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * generate uuid
   * @returns {String} new id
   * @author nvthinh 6.9.2023
   */
  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  },

  /**
   * @returns {String}
   * @author nvthinh 6.9.2023
   */
  removeSpecialCharacters(str = "") {
    return str.replace(/[^0-9]/g, "");
  },

  /**
   * Mapping enum với resource phục vụ hiển thị dữ liệu
   * @param {Object} enumObj Object khởi tạo trong enum
   * @param {Object} resourceObj object khởi tạo trong resource
   * @returns {Object}
   * @author nvthinh 1.12.2023
   */
  mappingEnumWithResource(enumObj, resourceObj) {
    let result = {};
    const keys = Object.keys(enumObj);
    keys.forEach((key) => {
      result[enumObj[key]] = resourceObj[key];
    });
    return result;
  },
};
