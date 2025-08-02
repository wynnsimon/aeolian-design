import { withInstall } from "@aeolian-design/utils/src/with-install";
import _Icon from "./icon.vue";

const Icon = withInstall(_Icon);

declare module "vue" {
  export interface GlobalComponents {
    AoIcon: typeof Icon;
  }
}

export default Icon;
