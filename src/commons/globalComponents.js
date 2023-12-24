import TDynamicPopup from "@/components/popup/TDynamicPopup.vue";
import TGridViewer from "@/components/grid/TGridViewer.vue";
import TCurrencyInput from "@/components/input/TCurrencyInput.vue";

export function useComponents(app) {
  app.component(TDynamicPopup.name, TDynamicPopup);
  app.component(TGridViewer.name, TGridViewer);
  app.component(TCurrencyInput.name, TCurrencyInput);
}
