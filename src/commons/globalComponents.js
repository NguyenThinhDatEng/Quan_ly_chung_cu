import TDynamicPopup from "@/components/popup/TDynamicPopup.vue";
import TGridViewer from "@/components/grid/TGridViewer.vue";

export function useComponents(app) {
  app.component(TDynamicPopup.name, TDynamicPopup);
  app.component(TGridViewer.name, TGridViewer);
}
