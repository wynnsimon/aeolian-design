# 图标

Aeolian-Design 推荐使用xicons作为图标库
```shell
$ pnpm add @vicons/antd
```

## 使用
如果你想像用例一样直接使用才能够直接在项目里使用


<script setup lang="ts">
import { AppleOutlined } from "@vicons/antd";
</script>
<ao-icon :color="'blue'" :size="40">
  <AppleOutlined />
</ao-icon>

<ao-icon :color="'#26fec3'" :size="'60px'">
  <AppleOutlined />
</ao-icon>


```vue
<script setup lang="ts">
import { AppleOutlined } from "@vicons/antd";
</script>
<ao-icon :color="'blue'" :size="40">
  <AppleOutlined />
</ao-icon>
```

## API

### Props
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 图标颜色 | string | undefined |
| size | 图标大小 | number \| string | undefined |
