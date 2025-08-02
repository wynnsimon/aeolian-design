import { withInstall } from "@aeolian-design/utils/src/with-install";
import _Tree from "./tree.vue";

const Tree = withInstall(_Tree);

declare module "vue" {
  export interface GlobalComponents {
    AoTree: typeof Tree;
  }
}

export default Tree;
