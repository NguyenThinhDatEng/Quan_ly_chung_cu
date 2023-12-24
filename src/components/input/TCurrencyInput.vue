<template>
  <div class="el-input">
    <div :class="['el-input__wrapper', { 'is-focus': isFocus }]">
      <input
        ref="inputRef"
        type="text"
        class="el-input__inner"
        :placeholder="placeholder"
        @focus="focus"
        @blur="blur"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useCurrencyInput } from "vue-currency-input";

export default {
  name: "TCurrencyInput",
  props: {
    modelValue: Number,
    /**
     * currency: "VND",
     * locale: "de-DE",
     * currencyDisplay: "symbol", // narrowSymbol, code, name, hidden
     * precision: 0, // No of Decimal places
     * hideCurrencySymbolOnFocus: true,
     * hideGroupingSeparatorOnFocus: false, // Ex: hide . in 1.000 when focus input
     * hideNegligibleDecimalDigitsOnFocus: true,
     * useGrouping: true, // Ex: use 1.000 (not 1000)
     * valueRange: {
          min: 0,
        },
     */
    options: Object,
    placeholder: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(props.options);

    const isFocus = ref(false);
    const focus = () => {
      isFocus.value = true;
    };

    const blur = () => {
      isFocus.value = false;
    };

    return { inputRef, focus, isFocus, blur };
  },
};
</script>

<style lang="scss" scoped>
</style>