import type { Plugin, App } from "vue-demi";

// 修改泛型约束为 any，并确保返回值兼容组件和插件
export function withInstall<T>(comp: T) {
  (comp as T & Plugin).install = function (app: App) {
    app.component((comp as { name: string }).name, comp as any);
  };
  return comp as T & Plugin;
}