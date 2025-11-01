import { withInstall } from "@aeolian-design/utils/src/with-install";
import _Message from "./message.vue";

const Message = withInstall(_Message);

declare module "vue-demi" {
  export interface GlobalComponents {
    AoMessage: typeof Message;
  }
}

export default Message;
export * from "./message";