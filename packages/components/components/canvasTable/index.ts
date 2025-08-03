import { withInstall } from "@aeolian-design/utils/src/with-install";
import _CanvasTable from "./canvasTable.vue";

const CanvasTable = withInstall(_CanvasTable);

declare module "vue" {
  export interface GlobalComponents {
    AoCanvasTable: typeof CanvasTable;
  }
}

export default CanvasTable;
