import { defineAsyncComponent } from "vue";

const ResidentsDetail = defineAsyncComponent(() =>
  import("@/views/management/residents/ResidentsDetail.vue")
);
const ContributionFeesDetail = defineAsyncComponent(() =>
  import("@/views/management/contributionFees/ContributionFeesDetail.vue")
);

export function register(app) {
  app.component("ResidentsDetail", ResidentsDetail);
  app.component("ContributionFeesDetail", ContributionFeesDetail);
}
