import { defineAsyncComponent } from "vue";

const UserDetail = defineAsyncComponent(() =>
  import("@/views/tenant/dictionary/user/User.vue")
);

export function registerDictionary(app) {
  app.component("UserDetail", UserDetail);
}
