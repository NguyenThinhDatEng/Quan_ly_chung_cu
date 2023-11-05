import Status from "./statusResource";
export default {
  // Nội dung các item trong danh mục
  ItemContents: {
    general: {
      content: "Tổng quan",
      router: "tong-quan",
    },
    asset: {
      content: "Tài sản",
      router: "tai-san",
      sub_list: {
        write_increase: {
          content: "Ghi tăng",
          router: "ghi-tang",
        },
        change_info: { content: "Thay đổi thông tin" },
        "re-review": { content: "Đánh giá lại" },
        depreciation: { content: "Tính hao mòn" },
        transfer: { content: "Điều chuyển tài sản" },
        write_decrease: { content: "Ghi giảm" },
        inventory: { content: "Kiểm kê" },
        other: { content: "Khác" },
      },
    },
    path: {
      content: "Tài sản HT-ĐB",
      router: "tai-san-he-thong-duong-bo",
    },
    tool: {
      content: "Công cụ dụng cụ",
      router: "cong-cu-dung-cu",
    },
    category: {
      content: "Danh mục",
      router: "danh-muc",
    },
    search: {
      content: "Tra cứu",
      router: "tra-cuu",
    },
    report: {
      content: "Báo cáo",
      router: "bao-cao",
    },
  },
  // Tooltip
  Title: {
    home: "Trang chủ",
    extension: "Mở rộng sidebar",
    collapse: "Thu gọn sidebar",
    more: "Xem thêm",
    year: "Năm",
    increase: "Tăng",
    decrease: "Giảm",
    "financial-department": "Sở tài chính",
    "search-input": "Tìm kiếm theo tên, mã tài sản",
    fixed_asset_category_filter: "Lọc theo loại tài sản",
    department_filter: "lọc theo bộ phận sử dụng",
    add: "Thêm mới",
    delete: "Xóa",
    edit: "Sửa",
    duplicate: "Nhân bản",
    export: "Xuất dữ liệu",
    limit: "Số lượng bản ghi hiển thị",
    close: "Đóng",
    save: "Lưu thông tin",
    update: "Cập nhật thông tin",
    noSave: "Không lưu thông tin thay đổi",
    cancel: "Hủy bỏ",
    add_voucher: "Thêm mới chứng từ",
    pay: "Thanh toán",
  },
  // Liên quan sản phẩm
  QLTS: {
    logo: "MISA QLTS",
    file_name: "Danh sách tài sản cố định",
    login_with: "Đăng nhập để làm việc với ",
    copyright: "Copyright © 2020 MISA JSC",
  },
  // Tiêu đề trang
  PageTitle: {
    assetList: "Danh sách tài sản",
  },
  // Tiêu đề header của trang
  HeaderTitle: {
    account: "Tài khoản",
    help: "Hỗ trợ",
    menu: "Danh mục",
    notification: "Thông báo",
  },
  // Tên button
  ButtonName: {
    "asset-add": "Thêm tài sản",
    login: "Đăng nhập",
  },
  // Từ viết tắt
  Abbreviations: {
    path: "Tài sản Hệ thống - Đường bộ",
    depreciation: "Hao mòn/Khấu hao lũy kế",
    STT: "Số thứ tự",
  },
  // Tiêu đề các cột trong bảng
  Columns: {
    stt: "STT",
    "asset-code": "Mã tài sản",
    "asset-name": "Tên tài sản",
    "asset-category": "Loại tài sản",
    department: "Bộ phận sử dụng",
    quantity: "Số lượng",
    cost: "Nguyên giá",
    depreciation: "HM/KH lũy kế",
    residual_value: "Giá trị còn lại",
    feature: "Tính năng",
  },
  // Tên popup qua từng chế độ chọn
  PopupTitle: {
    add: "Thêm mới tài sản",
    edit: "Sửa tài sản",
    duplicate: "Nhân bản tài sản",
    add_voucher: "Thêm chứng từ ghi tăng",
    select_increment_asset: "Chọn tài sản ghi tăng",
    edit_increment_asset: "Sửa chứng từ ghi tăng",
  },
  // Nhãn các ô input trong popup
  PopupLabel: {
    room_category_name: "Tên loại phòng",
  },
  // Độ dài ký tự có thể nhập trong ô input
  InputLength: {
    fixed_asset_code: 50,
    fixed_asset_name: 255,
    department: 255,
    fixed_asset_category: 255,
    depreciation_rate: 5,
  },
  // Mô tả chức năng button
  ButtonContent: {
    save: "Lưu",
    cancel: "Hủy",
    remove: "Hủy bỏ",
    delete: "Xóa",
    no: "Không",
    noSave: "Không lưu",
    close: "Đóng",
    select_asset: "Chọn tài sản",
  },
  // ...
  Name: {
    export: "export",
    delete: "delete",
  },
  // Tên lỗi
  ErrorMessage: {
    blank: "là thông tin bắt buộc",
  },
  // Tin nhắn cảnh báo
  WarningMessage: {
    info: "Cần phải nhập thông tin",
    depreciation: "Tỉ lệ hao mòn phải bằng 1/Số năm sử dụng",
    costAndDepreciationValue: "Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá",
  },
  // Các trường dữ liệu yêu cầu trong popup
  RequiredData: {
    fixed_asset_id: false,
    fixed_asset_code: true,
    fixed_asset_name: true,
    department_id: false,
    department_code: true,
    department_name: false,
    fixed_asset_category_id: false,
    fixed_asset_category_code: true,
    fixed_asset_category_name: false,
    quantity: false,
    cost: true,
    life_time: true,
    depreciation_rate: true,
    depreciation_value: true,
    tracked_year: false,
    purchase_date: false,
    production_date: false,
  },
  // Các trường dữ liệu cần lưu trữ trong popup
  PopupField: {
    fixed_asset_id: "fixed_asset_id",
    fixed_asset_code: "fixed_asset_code",
    fixed_asset_name: "fixed_asset_name",
    department_id: "department_id",
    department_code: "department_code",
    department_name: "department_name",
    fixed_asset_category_id: "fixed_asset_category_id",
    fixed_asset_category_code: "fixed_asset_category_code",
    fixed_asset_category_name: "fixed_asset_category_name",
    quantity: "quantity",
    cost: "cost",
    life_time: "life_time",
    depreciation_rate: "depreciation_rate",
    depreciation_value: "depreciation_value",
    tracked_year: "tracked_year",
    purchase_date: "purchase_date",
    production_date: "production_date",
  },
  // Nội dung hiển thị thông báo
  ToastContent: {
    Add: {
      Success: Status.action.add + " " + Status.status.success,
      Fail: Status.action.add + " " + Status.status.fail,
    },
    Update: {
      Success: Status.action.update + " " + Status.status.success,
      Fail: Status.action.update + " " + Status.status.fail,
    },
    Delete: {
      Success: Status.action.delete + " " + Status.status.success,
      Fail: Status.action.delete + " " + Status.status.fail,
    },
    Duplicate: {
      Success: Status.action.duplicate + " " + Status.status.success,
      Fail: Status.action.duplicate + " " + Status.status.fail,
    },
    DeleteMulti: { Fail: Status.action.deleteMulti + " " + Status.status.fail },
    DeleteMultiSuccess: " bản ghi đã được xóa thành công", // 02 bản ghi đã được xóa thành công
    Error: "Có lỗi xảy ra!",
    Login: "Tài khoản hoặc mật khẩu không chính xác",
  },
  // Các trường áp dụng vào tìm kiếm, lọc và phân trang dữ liệu
  Filter: {
    keyword: "keyword",
    department_id: "department_id",
    fixed_asset_category_id: "fixed_asset_category_id",
    limit: "limit",
    offset: "offset",
  },
  // Các kiểu trang ở table footer
  PageNumber: {
    prePage: "Trang trước",
    currentPage: "Trang hiện tại",
    nextPage: "Trang sau",
  },
  // Nhãn các inputs
  InputLabel: {
    voucher_code: "Mã chứng từ",
    voucher_date: "Ngày chứng từ",
    increment_date: "Ngày ghi tăng",
    description: "Ghi chú",
    department: "Bộ phận sử dụng",
  },
  // Giới tính
  Gender: {
    Other: "Khác",
    Male: "Nam",
    Female: "Nữ",
  },
};
