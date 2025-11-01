import { withInstall } from "@aeolian-design/utils/src/with-install";
import _Upload from "./upload.vue";

const Upload = withInstall(_Upload);

declare module "vue-demi" {
  export interface GlobalComponents {
    AoUpload: typeof Upload;
  }
}

export default Upload;
