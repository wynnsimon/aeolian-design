import DefaultTheme from "vitepress/theme";
import {
  Icon,
  Tree,
  VirtualList,
  Checkbox,
  Button,
  CanvasTable,
  Input,
} from "@aeolian-design/components";

const plugins = [Icon, Tree, VirtualList, Checkbox, Button, CanvasTable, Input];

export default {
  ...DefaultTheme,
  enhanceApp: ({ app }) => {
    plugins.forEach((plugin) => app.use(plugin));
  },
};
