import { withInstall } from "@aeolian-design/utils/src/with-install";
import _Signature from "./signature.vue";

const Signature = withInstall(_Signature);

declare module "vue-demi" {
  export interface GlobalComponents {
    AoSignature: typeof Signature;
  }
}

export default Signature;
