import { $vfm } from "vue-final-modal";

class PopupUtil {
  _component = {};

  show(name, params) {
    const popup = $vfm.show({ component: name }, params);
    console.log("popup: ", name);
    return popup;
  }
}

export default new PopupUtil();
