import { withInstall } from "@aeolian-design/utils/src/with-install";
import _OnlineExcel from "./onlineExcel.vue";

const OnlineExcel = withInstall(_OnlineExcel);

declare module "vue-demi" {
  export interface GlobalComponents {
    AoOnlineExcel: typeof OnlineExcel;
  }
}

export default OnlineExcel;
