export default {
  Status: {
    noContent: "Không có dữ liệu",
  },
  // Table Row
  TableRow: {
    FixedAsset: {
      checkbox: { ENG: "checkbox" },
      numerical_order: { ENG: "numerical_order", VN: "STT" },
      fixed_asset_code: { ENG: "fixed_asset_code", VN: "Mã tài sản" },
      fixed_asset_name: { ENG: "fixed_asset_name", VN: "Tên tài sản" },
      fixed_asset_category_name: {
        ENG: "fixed_asset_category_name",
        VN: "Loại tài sản",
      },
      department_name: { ENG: "department_name", VN: "Bộ phận sử dụng" },
      quantity: { ENG: "quantity", VN: "Số lượng" },
      cost: { ENG: "cost", VN: "Nguyên giá" },
      accumulated_value: { ENG: "accumulated_value", VN: "HM/KH lũy kế" },
      residual_value: { ENG: "residual_value", VN: "Giá trị còn lại" },
      feature: { ENG: "feature", VN: "Tính năng" },
    },
    FixedAssetDetail: {
      numerical_order: { ENG: "numerical_order", VN: "STT" },
      fixed_asset_code: { ENG: "fixed_asset_code", VN: "Mã tài sản" },
      fixed_asset_name: { ENG: "fixed_asset_name", VN: "Tên tài sản" },
      department_name: { ENG: "department_name", VN: "Bộ phận sử dụng" },
      cost: { ENG: "cost", VN: "Nguyên giá" },
      accumulated_value: { ENG: "accumulated_value", VN: "Hao mòn năm" },
      residual_value: { ENG: "residual_value", VN: "Giá trị còn lại" },
    },
    Voucher: {
      checkbox: { ENG: "checkbox" },
      numerical_order: { ENG: "numerical_order", VN: "STT" },
      voucher_code: { ENG: "voucher_code", VN: "Số chứng từ" },
      voucher_date: { ENG: "voucher_date", VN: "Ngày chứng từ" },
      increment_date: { ENG: "increment_date", VN: "Ngày ghi tăng" },
      total_of_cost: { ENG: "total_of_cost", VN: "Tổng nguyên giá" },
      description: { ENG: "description", VN: "Nội dung" },
    },
  },
  // Table Foot
  TableFoot: {
    Page: {
      fixedAsset: "fixedAsset",
      voucher: "voucher",
      voucher_detail: "voucher_detail",
      fixedAssetDetail: "fixedAssetDetail",
      assetList: "assetList",
    },
  },
  // Table Head
  TableHead: {
    FixedAsset: {
      "Số thứ tự": "numerical_order",
      "Mã tài sản": "fixed_asset_code",
      "Tên tài sản": "fixed_asset_name",
      "Loại tài sản": "fixed_asset_category_name",
      "Bộ phận sử dụng": "department_name",
      "Số lượng": "quantity",
      "Nguyên giá": "cost",
      "Hao mòn/Khấu hao lũy kế": "accumulated_value",
      "Giá trị còn lại": "residual_value",
    },
  },
};
