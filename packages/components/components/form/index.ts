import { withInstall } from "@aeolian-design/utils/src/with-install";
import _Form from "./form.vue";

const Form = withInstall(_Form);

declare module "vue" {
  export interface GlobalComponents {
    AoForm: typeof Form;
  }
}

export default Form;
