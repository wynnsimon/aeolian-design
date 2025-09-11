import { withInstall } from "@aeolian-design/utils/src/with-install";
import _Editor from "./editor.vue";

const Editor = withInstall(_Editor);

declare module "vue" {
  export interface GlobalComponents {
    AoEditor: typeof Editor;
  }
}

export default Editor;
