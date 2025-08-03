import { withInstall } from "@aeolian-design/utils/src/with-install";
import _FormItem from "./formItem.vue";

const FormItem = withInstall(_FormItem);

declare module "vue" {
  export interface GlobalComponents {
    AoFormItem: typeof FormItem;
  }
}

export default FormItem;
