import { withInstall } from "@aeolian-design/utils/src/with-install";
import _DrawingBoard from "./drawingBoard.vue";

const DrawingBoard = withInstall(_DrawingBoard);

declare module "vue" {
  export interface GlobalComponents {
    AoDrawingBoard: typeof DrawingBoard;
  }
}

export default DrawingBoard;
