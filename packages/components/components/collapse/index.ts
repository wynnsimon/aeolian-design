import { withInstall } from "@aeolian-design/utils/src/with-install";
import _Collapse from "./collapse.vue";
import _CollapseItem from "./collapseItem.vue";

const Collapse = withInstall(_Collapse);
const CollapseItem = withInstall(_CollapseItem);

declare module "vue-demi" {
  export interface GlobalComponents {
    AoCollapse: typeof Collapse;
    AoCollapseItem: typeof CollapseItem;
  }
}

export { Collapse, CollapseItem };
export default Collapse;
