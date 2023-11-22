import { defineAsyncComponent } from "vue";

const ResidentsDetail = defineAsyncComponent(() =>
  import("@/views/management/residents/ResidentsDetail.vue")
);
const ContributionFeesDetail = defineAsyncComponent(() =>
  import("@/views/management/contributionFees/ContributionFeesDetail.vue")
);
const ApartmentDetail = defineAsyncComponent(() =>
  import("@/views/dictionary/apartment/ApartmentDetail.vue")
);

export function register(app) {
  app.component("ResidentsDetail", ResidentsDetail);
  app.component("ContributionFeesDetail", ContributionFeesDetail);
  app.component("ApartmentDetail", ApartmentDetail);
}
