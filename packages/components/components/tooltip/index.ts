import { withInstall } from "@aeolian-design/utils/src/with-install";
import _Tooltip from "./tooltip.vue";

const Tooltip = withInstall(_Tooltip);

declare module "vue-demi" {
  export interface GlobalComponents {
    AoTooltip: typeof Tooltip;
  }
}

export default Tooltip;
