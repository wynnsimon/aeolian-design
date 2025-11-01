import { withInstall } from "@aeolian-design/utils/src/with-install";
import _Checkbox from "./checkbox.vue";

const Checkbox = withInstall(_Checkbox);

declare module "vue-demi" {
  export interface GlobalComponents {
    AoCheckbox: typeof Checkbox;
  }
}

export default Checkbox;
