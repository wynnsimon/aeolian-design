import { withInstall } from "@aeolian-design/utils/src/with-install";
import _VirtualList from "./virtualList.vue";

const VirtualList = withInstall(_VirtualList);

declare module "vue" {
  export interface GlobalComponents {
    AoVirtualList: typeof VirtualList;
  }
}

export default VirtualList;
