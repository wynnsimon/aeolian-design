import { withInstall } from "@aeolian-design/utils/src/with-install";
import _Input from "./input.vue";

const Input = withInstall(_Input);

declare module "vue-demi" {
  export interface GlobalComponents {
    AoInput: typeof Input;
  }
}

export default Input;
