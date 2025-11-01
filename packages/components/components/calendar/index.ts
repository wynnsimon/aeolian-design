import { withInstall } from "@aeolian-design/utils/src/with-install";
import _Calendar from "./calendar.vue";

const Calendar = withInstall(_Calendar);

declare module "vue-demi" {
  export interface GlobalComponents {
    AoCalendar: typeof Calendar;
  }
}

export default Calendar;
