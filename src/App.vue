<template>
  <router-view />
  <modals-container />
</template>

<script>
// import ContributionFeesDetail from "@/views/management/contributionFees/ContributionFeesDetail.vue";
import { ModalsContainer } from "vue-final-modal";
export default {
  name: "App",
  components: {
    // ContributionFeesDetail,
    ModalsContainer,
  },
};
</script>

<style>
</style>