import DefaultTheme from "vitepress/theme";
import { Icon } from "@aeolian-design/components/index";
export default {
  ...DefaultTheme,
  enhanceApp: ({ app }) => {
    app.use(Icon);
  },
};
