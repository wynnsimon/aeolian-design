# Upload 上传组件

上传组件用于将文件分片上传至服务器，支持断点续传、暂停上传等功能。

## 使用
> [!warning] warning
> 演示示例暂不可用，因为后端服务器没有启动。若想查看示例效果，请手动启动源码中 server 子包中的服务器。


<ao-upload
  upload-url="http://localhost:8000/upload"
  merge-url="http://localhost:8000/upload_end"
  verify-url="http://localhost:8000/upload_verify"
>
</ao-upload>

### 基础用法

上传组件需要提供上传地址 `upload-url`、合并地址 `merge-url`、验证地址 `verify-url`。

```vue
<template>
  <ao-upload
    upload-url="http://localhost:8000/upload"
    merge-url="http://localhost:8000/upload_end"
    verify-url="http://localhost:8000/upload_verify"
  >
  </ao-upload>
</template>
```

### Props

| 参数名       | 说明                   | 类型   | 默认值  | 是否必填 |
|------------|----------------------|--------|--------|---------|
| upload-url | 文件分片上传地址         | string | -      | 是      |
| merge-url  | 文件分片合并地址         | string | -      | 是      |
| verify-url | 文件上传前验证地址        | string | -      | 是      |
| chunk-size | 文件分片大小             | number | 5242880（5MB） | 否      |

### Events

当前组件未对外暴露任何事件。

### 插槽

| 插槽名   | 说明             |
|---------|------------------|
| default | 默认插槽，位于上传组件最外层容器中，可用于自定义内容 |