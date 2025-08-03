import { withInstall } from "@aeolian-design/utils/src/with-install";
import _Button from "./button.vue";

const Button = withInstall(_Button);

declare module "vue" {
  export interface GlobalComponents {
    AoButton: typeof Button;
  }
}

export default Button;
