import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { Icon,Tree,VirtualList,Checkbox,Button,CanvasTable,Input } from "@aeolian-design/components";

const plugins = [Icon,Tree,VirtualList,Checkbox,Button,CanvasTable,Input];

const app = createApp(App);
plugins.forEach((plugin) => app.use(plugin));

app.mount("#app");
