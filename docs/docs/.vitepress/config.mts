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
          items: [{ text: "图标", link: "/components/icon" }],
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
