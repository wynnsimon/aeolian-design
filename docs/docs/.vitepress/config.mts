import { defineConfig } from "vitepress";

import markdownItTaskCheckbox from "markdown-it-task-checkbox";
import { groupIconMdPlugin } from "vitepress-plugin-group-icons";
import { MermaidMarkdown, MermaidPlugin } from "vitepress-plugin-mermaid";
import UnoCSS from "unocss/vite";
import DefineOptions from "unplugin-vue-define-options/vite";
import { usePosts } from "./theme/untils/permalink";

const { rewrites } = await usePosts();
export default defineConfig({
  lang: "zh-CN",
  title: "Aeolian Design",
  description: "Aeolian Design 中文文档",
  rewrites,

  // #region fav
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  // #endregion fav

  base: "/", //网站部署到github的vitepress这个仓库里

  // cleanUrls:true, //开启纯净链接无html

  //启用深色模式
  appearance: "dark",

  //markdown配置
  markdown: {
    //行号显示
    lineNumbers: true,

    // toc显示一级标题
    toc: { level: [1, 2, 3] },

    // 开启图片懒加载
    image: {
      lazyLoading: true,
    },

    config: (md) => {
      // 组件插入h1标题下
      // 替换第72行开始的 md.use 匿名函数部分为以下内容：
      md.use(groupIconMdPlugin); //代码组图标
      md.use(markdownItTaskCheckbox); //todo
      md.use(MermaidMarkdown);
    },
  },

  vite: {
    plugins: [MermaidPlugin(), DefineOptions(), UnoCSS()] as any,
    optimizeDeps: {
      include: ["mermaid"],
    },
    ssr: {
      noExternal: ["mermaid"],
    },
  },

  lastUpdated: true, //此配置不会立即生效，需git提交后爬取时间戳，没有安装git本地报错可以先注释

  //主题配置
  themeConfig: {
    //左上角logo
    logo: "/logo.png",

    //编辑本页
    editLink: {
      pattern: "https://github.com/PinkDopeyBug/aeolian-design/docs/:path", // 改成自己的仓库
      text: "在GitHub编辑本页",
    },

    //上次更新时间
    lastUpdated: {
      text: "上次更新时间",
      formatOptions: {
        dateStyle: "short", // 可选值full、long、medium、short
        timeStyle: "medium", // 可选值full、long、medium、short
      },
    },

    //导航栏
    nav: [
      { text: "首页", link: "/" },
      {
        text: "指南",
        items: [
          { text: "快速上手", link: "/guide/quickstart" },
          {
            text: "下载",
            link: "/guide/installation",
          },
        ],
      },
      {
        text: "组件",
        items: [
          {
            text: "Basic 基础组件",
            items: [
              { text: "Icon 图标", link: "/components/icon" },
              { text: "Button 按钮", link: "/components/button" },
            ],
          },
          {
            text: "Form 表单组件",
            items: [
              { text: "Checkbox 多选框", link: "/components/checkbox" },
              { text: "Input 输入框", link: "/components/input" },
              { text: "Form 表单", link: "/components/form" },
            ],
          },
          {
            text: "Data 数据展示",
            items: [
              { text: "Calendar 日历", link: "/components/calendar" },
              { text: "Collapse 折叠面板", link: "/components/collapse" },
              {
                text: "Canvas Table 画布表格",
                link: "/components/canvasTable",
              },
              {
                text: "Virtualized Table 虚拟化表格",
                link: "/components/virtualList",
              },
              { text: "Tree 树形组件", link: "/components/tree" },
            ],
          },
          {
            text: "Feedback 反馈组件",
            items: [
              { text: "Message 消息提示", link: "/components/message" },
              { text: "Tooltip 文字提示", link: "/components/tooltip" },
            ],
          },
        ],
      },
    ],

    //侧边栏
    sidebar: [
      {
        collapsed: false,
        text: "Basic 基础组件",
        items: [
          { text: "Icon 图标", link: "/components/icon" },
          { text: "Button 按钮", link: "/components/button" },
        ],
      },
      {
        collapsed: false,
        text: "Form 表单组件",
        items: [
          { text: "Checkbox 多选框", link: "/components/checkbox" },
          { text: "Input 输入框", link: "/components/input" },
          { text: "Form 表单", link: "/components/form" },
        ],
      },
      {
        collapsed: false,
        text: "Data 数据展示",
        items: [
          { text: "Calendar 日历", link: "/components/calendar" },
          { text: "Collapse 折叠面板", link: "/components/collapse" },
          {
            text: "Canvas Table 画布表格",
            link: "/components/canvasTable",
          },
          {
            text: "Virtualized Table 虚拟化表格",
            link: "/components/virtualList",
          },
          { text: "Tree 树形组件", link: "/components/tree" },
        ],
      },
      {
        collapsed: false,
        text: "Feedback 反馈组件",
        items: [
          { text: "Message 消息提示", link: "/components/message" },
          { text: "Tooltip 文字提示", link: "/components/tooltip" },
        ],
      },
    ],

    //社交链接
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/PinkDopeyBug/aeolian-design",
      },
      {
        icon: "bilibili",
        link: "https://space.bilibili.com/483518899?spm_id_from=333.1007.0.0",
      },
    ],

    //手机端深浅模式文字修改
    darkModeSwitchLabel: "主题模式",

    //页脚
    footer: {
      message: "Released under the MIT License.",
      copyright: `🥼 vitepress & ✒️ <a href="https://beian.miit.gov.cn/" target="_blank">PinkDopeyBug</a>`,
    },

    //侧边栏文字更改(移动端)
    sidebarMenuLabel: "目录",

    //返回顶部文字修改(移动端)
    returnToTopLabel: "返回顶部",

    //大纲显示2-3级标题
    outline: {
      level: [2, 3],
      label: "当前页大纲",
    },

    //自定义上下页名
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
  },
});
