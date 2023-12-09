<template>
  <div class="user-info-container">
    <div class="user-image">
      <img src="https://soict.hust.edu.vn/wp-content/uploads/ta_hai_tung_vt_soict.jpg">
    </div>
    <div class="user-info">
      <h2 class="info-heading">Thông tin Quản Trị viên</h2>
      <table class="user-table">
        <tr>
          <td class="info-label">Tên: Nguyễn Văn Thịnh</td>
          <td class="info-value">{{'Số CCCD: 43535639631'}}</td>
        </tr>
        <tr>
          <td class="info-label">Chức vụ: Ban quản lý</td>
          <td class="info-value">{{'Ngày sinh: 25/12/1976'}}</td>
        </tr>
        <tr>
          <td class="info-label">Email: nguyenthinh123@gmail.com</td>
          <td class="info-value">{{'Địa chỉ thường trú: Cầu Giấy, Hà Nội'}}</td>
        </tr>
        <!-- Add more rows for additional information -->
      </table>
    </div>
  </div>
</template>

<style scoped>
.user-info-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-image {
  margin-right: 300px; /* Khoảng cách giữa ảnh và bảng thông tin */
}

.user-image img {
  max-width: 400px; /* Ảnh sẽ không vượt quá kích thước của container */
}

.user-info {
  text-align: left;
}
.info-heading {
  font-size: 20px; /* Adjust the font size as needed */
}

.user-table {
  width: 100%;
  margin: 25px auto;
  border-collapse: collapse;
  text-align: left; /* Dịch thông tin về phải */
  margin-right: auto; /* Dịch bảng về phía phải của màn hình */
}

.user-table td {
  padding: 15px;
  border: none; /* Xóa đường viền */
}

.info-label {
  font-weight: bold;
}

.info-value {
  color: #666;
}

</style>
