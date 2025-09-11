import { createApp } from "vue";
import App from "./App.vue";
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
  Editor,
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
  Editor,
];

const app = createApp(App);
plugins.forEach((plugin) => app.use(plugin));

app.mount("#app");
