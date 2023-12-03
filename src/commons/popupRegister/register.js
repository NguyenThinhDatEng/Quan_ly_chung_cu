import { defineAsyncComponent } from "vue";

const ResidentsDetail = defineAsyncComponent(() =>
  import("@/views/management/residents/ResidentsDetail.vue")
);
const ContributionFeesDetail = defineAsyncComponent(() =>
  import("@/views/management/contributionFees/ContributionFeesDetail.vue")
);
//#region dictionary
const ApartmentDetail = defineAsyncComponent(() =>
  import("@/views/dictionary/apartment/ApartmentDetail.vue")
);
const VehicleDetail = defineAsyncComponent(() =>
  import("@/views/dictionary/vehicle/VehicleDetail.vue")
);
const ServiceDetail = defineAsyncComponent(() =>
  import("@/views/dictionary/service/ServiceDetail.vue")
);
//#endregion

export function register(app) {
  app.component("ResidentsDetail", ResidentsDetail);
  app.component("ContributionFeesDetail", ContributionFeesDetail);
  //#region
  app.component("ApartmentDetail", ApartmentDetail);
  app.component("VehicleDetail", VehicleDetail);
  app.component("ServiceDetail", ServiceDetail);
  //#endregion
}
