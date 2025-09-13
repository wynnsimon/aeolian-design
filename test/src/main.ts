import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
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
  OnlineExcel,
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
  OnlineExcel,
];

const app = createApp(App);
app.use(router);
plugins.forEach((plugin) => app.use(plugin));

app.mount("#app");
