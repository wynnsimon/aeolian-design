import DefaultTheme from "vitepress/theme";
import {
  Icon,
  Tree,
  VirtualList,
  Checkbox,
  Button,
  CanvasTable,
  Input,
  Form,
  FormItem,
  Upload,
  Calendar,
  Collapse,
  CollapseItem,
  Tooltip,
  Message,
} from "@aeolian-design/components";

const plugins = [
  Icon,
  Tree,
  VirtualList,
  Checkbox,
  Button,
  CanvasTable,
  Input,
  Form,
  FormItem,
  Upload,
  Calendar,
  Collapse,
  CollapseItem,
  Tooltip,
  Message,
];

export default {
  ...DefaultTheme,
  enhanceApp: ({ app }) => {
    plugins.forEach((plugin) => app.use(plugin));
  },
};
