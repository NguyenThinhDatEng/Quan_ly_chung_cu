import { defineAsyncComponent } from "vue";

//#region Management
const ContributionFeesDetail = defineAsyncComponent(() =>
  import("@/views/management/contributionFees/ContributionFeesDetail.vue")
);
const FeesDetail = defineAsyncComponent(() =>
  import("@/views/management/fees/FeesDetail.vue")
);
const PaymentDetail = defineAsyncComponent(() =>
  import("@/views/management/fees/PaymentDetail.vue")
);
const RoomRentalDetail = defineAsyncComponent(() =>
  import("@/views/management/roomRental/RoomRentalDetail.vue")
);
const VehicleDetail = defineAsyncComponent(() =>
  import("@/views/management/roomRental/VehicleDetail.vue")
);
//#endregion
//#region dictionary
const ResidentsDetail = defineAsyncComponent(() =>
  import("@/views/dictionary/residents/ResidentsDetail.vue")
);
const ApartmentDetail = defineAsyncComponent(() =>
  import("@/views/dictionary/apartment/ApartmentDetail.vue")
);
const VehicleFeeDetail = defineAsyncComponent(() =>
  import("@/views/dictionary/vehicle/VehicleFeeDetail.vue")
);
const ServiceDetail = defineAsyncComponent(() =>
  import("@/views/dictionary/service/ServiceDetail.vue")
);
//#endregion

export function register(app) {
  //#region Management
  app.component("ContributionFeesDetail", ContributionFeesDetail);
  app.component("FeesDetail", FeesDetail);
  app.component("PaymentDetail", PaymentDetail);
  app.component("RoomRentalDetail", RoomRentalDetail);
  app.component("VehicleDetail", VehicleDetail);
  //#endregion

  //#region Dictionary
  app.component("ResidentsDetail", ResidentsDetail);
  app.component("ApartmentDetail", ApartmentDetail);
  app.component("VehicleFeeDetail", VehicleFeeDetail);
  app.component("ServiceDetail", ServiceDetail);
  //#endregion
}
