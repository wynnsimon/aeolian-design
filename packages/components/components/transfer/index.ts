import { withInstall } from "@aeolian-design/utils/src/with-install";
import _Transfer from "./transfer.vue";
import _TransferItem from "./transferItem.vue";

const TransferItem = withInstall(_TransferItem);
const Transfer = withInstall(_Transfer);

declare module "vue" {
  export interface GlobalComponents {
    AoTransfer: typeof Transfer;
    AoTransferItem: typeof TransferItem;
  }
}

export { TransferItem };
export default Transfer;
