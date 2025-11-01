declare module "*.vue" {
  import { DefineComponent } from "vue-demi";
  const component: DefineComponent<object, object, unknown>;
  export default component;
}
