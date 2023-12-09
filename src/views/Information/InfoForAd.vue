<template>
  <div class="user-info-container">
    <div class="user-image">
      <img src="https://scontent.fhan20-1.fna.fbcdn.net/v/t1.15752-9/370305439_362290362872438_27291511276564691_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFlPKwfbumWABecAUhDk8lhAIGX7z0WJ9EAgZfvPRYn0RLi1DhEZKVR_C1VGOKNVWnY0_4DW7P6SD7Jbkx5O-jP&_nc_ohc=iRlbOC26q6sAX-fGnly&_nc_ht=scontent.fhan20-1.fna&oh=03_AdRjYnCEu6eE8YaITur2hF7kI7gvgIN47EUr0Xq4c1xIPQ&oe=6575616E" alt="User Image">
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
