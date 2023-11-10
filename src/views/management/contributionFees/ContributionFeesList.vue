<template>
  <grid-viewer :table-data="tableData" :props-data="propsData"></grid-viewer>
</template>

<script>
import { useContributionFeesList } from "./contributionFeesList";

export default {
  setup() {
    const contributionFeesList = useContributionFeesList();
    return contributionFeesList;
  },
};
</script>

<style lang="scss">
</style>