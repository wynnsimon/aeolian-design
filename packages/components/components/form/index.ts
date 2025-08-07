import { withInstall } from "@aeolian-design/utils/src/with-install";
import _Form from "./form.vue";
import _FormItem from "../form/formItem.vue";

const Form = withInstall(_Form);
const FormItem = withInstall(_FormItem);

declare module "vue" {
  export interface GlobalComponents {
    AoForm: typeof Form;
    AoFormItem: typeof FormItem;
  }
}

export type FormInstance = InstanceType<typeof Form>;

export default Form;
export { FormItem, Form };
