import TDynamicPopup from "@/components/popup/TDynamicPopup.vue";
import GridViewer from "@/components/grid/GridViewer.vue";

export function useComponents(app) {
  app.component(TDynamicPopup.name, TDynamicPopup);
  app.component(GridViewer.name, GridViewer);
}
