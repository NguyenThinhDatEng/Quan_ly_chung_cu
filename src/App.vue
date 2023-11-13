<template>
  <router-view />
  <ContributionFeesDetail />
</template>

<script>
import ContributionFeesDetail from "@/views/management/contributionFees/ContributionFeesDetail.vue";
export default {
  name: "App",
  components: {
    ContributionFeesDetail,
  },
};
</script>

<style>
</style>