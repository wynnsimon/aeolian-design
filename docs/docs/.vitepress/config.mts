import { defineConfig } from "vitepress";
import DefineOptions from "unplugin-vue-define-options/vite";
import UnoCSS from "unocss/vite";

export default defineConfig({
  title: "Aeolian-Design",
  description: "呆虫仙尊的组件库",
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      { text: "指南", link: "/guide/installation" },
      { text: "组件", link: "/components/icon" },
    ],

    sidebar: {
      "/guide": [
        {
          text: "指南",
          items: [
            { text: "安装", link: "/guide/installation" },
            { text: "快速上手", link: "/guide/quickstart" },
          ],
        },
      ],
      "/components": [
        {
          text: "组件",
          items: [
            { text: "Icon 图标", link: "/components/icon" },
            {
              text: "Button 按钮",
              link: "/components/button",
            },
            {
              text: "Checkbox 复选框",
              link: "/components/checkbox",
            },
            {
              text: "Tree 树形组件",
              link: "/components/tree",
            },
            {
              text: "Calendar 日历",
              link: "/components/calendar",
            },
            {
              text: "Canvas Table 画布表格",
              link: "/components/canvasTable",
            },
            {
              text: "Collapse 折叠面板",
              link: "/components/collapse",
            },
            {
              text: "Input 输入框",
              link: "/components/input",
            },
            {
              text: "Form 表单",
              link: "/components/form",
            },
            {
              text: "Message 消息提示",
              link: "/components/message",
            },
            {
              text: "Tooltip 文字提示",
              link: "/components/tooltip",
            },
            {
              text: "Virtual List 虚拟列表",
              link: "/components/virtualList",
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  vite: {
    plugins: [DefineOptions(), UnoCSS()],
  },
});
