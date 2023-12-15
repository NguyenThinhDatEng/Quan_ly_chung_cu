export default {
  Mode: {
    View: 0,
    Add: 1, // Thêm mới
    Update: 2, // Chỉnh sửa
    Delete: 3, // Xóa 1 bản ghi
  },
  // Phím tắt
  KeyCode: {
    Backspace: 8, // phím Backspace
    TAB: 9, // Phím Tab
    ENTER: 13, // Phím Enter
    Ctrl: 17, // Phím Ctrl
    ESC: 27, // Phím ESC
    ArrowLeft: 37, // Phím mũi tên trái
    ArrowUp: 38, // Phím mũi tên lên
    ArrowRight: 39, // Phím mũi tên phải
    ArrowDown: 40, // Phím mũi tên xuống
    Delete: 46, // Phím Delete
    F3: 114, // Phím F3
    SelectTable: 115, // Phím `
    F8: 119, // Phím F8
    F9: 120, // Phím F9
    Comma: 188, // Dấu ,
    Period: 190, // Dấu .
  },
  DataType: {
    Text: 0, // Kiểu chuỗi
    Number: 1, // Kiểu số
    Money: 2, // Kiểu tiền
    Year: 3, // Kiểu năm (thời gian)
    Rate: 4, // Kiểu tỉ lệ
  },
  ErrorCode: {
    DuplicateKey: 4,
    BadRequest: 3,
  },
  ActionStatus: {
    Success: 0,
    Error: 1,
    Warning: 2,
  },
  APIStatus: {
    Ok: 200,
  },
  // td trong table
  TableData: {
    type: {
      text: 0, // nhận dữ liệu chuỗi
      number: 1, // nhận dữ liệu kiểu số
      checkbox: 2, // nhận checkbox
      date: 3, // nhận dữ liệu thời gian
      boolean: 4, // Kiểu true/false
      enum: 5,
    },
  },
  Action: {
    Confirm: "confirm",
    Cancel: "cancel",
  },
};
