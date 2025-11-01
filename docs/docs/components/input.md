# Input 输入框

输入框用于用户输入内容，支持多种输入类型和功能。

## 使用

### 基础用法

<script setup lang="ts">
import { ref } from "vue"
import { AppleOutlined } from "@vicons/antd";

const inputValue = ref('')
const password = ref('')
const inputWithIcon = ref('')
const inputWithAddon = ref('')
</script>

<ao-input v-model="inputValue" placeholder="请输入内容" />

### 密码输入框

<ao-input v-model="password" type="password" placeholder="请输入密码" show-password/>

### 带图标的输入框

<div :style="{ display: 'flex', flexDirection: 'column', gap: '20px' }">
  <ao-input v-model="inputWithIcon" placeholder="前置图标">
    <template #prefixIcon>
      <ao-icon>
        <AppleOutlined />
      </ao-icon>
    </template>
  </ao-input>

  <ao-input v-model="inputWithIcon" placeholder="后置图标">
    <template #suffixIcon>
      <ao-icon>
        <AppleOutlined />
      </ao-icon>
    </template>
  </ao-input>
</div>

### 前置/后置内容

<div :style="{ display: 'flex', flexDirection: 'column', gap: '20px' }">
  <ao-input v-model="inputWithAddon" placeholder="前置内容">
    <template #prepend>http://</template>
  </ao-input>

  <ao-input v-model="inputWithAddon" placeholder="后置内容">
    <template #append>.com</template>
  </ao-input>

  <ao-input v-model="inputWithAddon" placeholder="前后置内容">
    <template #prepend>https://</template>
    <template #append>.org</template>
  </ao-input>
</div>

```vue
<template>
  <div :style="{ display: 'flex', flexDirection: 'column', gap: '20px' }">
    <!-- 基础用法 -->
    <ao-input v-model="inputValue" placeholder="请输入内容" />

    <!-- 密码输入框 -->
    <ao-input
      v-model="password"
      type="password"
      placeholder="请输入密码"
      show-password
    />

    <!-- 带图标的输入框 -->
    <ao-input v-model="inputWithIcon" placeholder="前置图标">
      <template #prefixIcon>
        <ao-icon>
          <AppleOutlined />
        </ao-icon>
      </template>
    </ao-input>

    <ao-input v-model="inputWithIcon" placeholder="后置图标">
      <template #suffixIcon>
        <ao-icon>
          <AppleOutlined />
        </ao-icon>
      </template>
    </ao-input>

    <!-- 前置/后置内容 -->
    <ao-input v-model="inputWithAddon" placeholder="前置内容">
      <template #prepend>http://</template>
    </ao-input>

    <ao-input v-model="inputWithAddon" placeholder="后置内容">
      <template #append>.com</template>
    </ao-input>

    <ao-input v-model="inputWithAddon" placeholder="前后置内容">
      <template #prepend>https://</template>
      <template #append>.org</template>
    </ao-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { AppleOutlined } from "@vicons/antd";

const inputValue = ref("");
const password = ref("");
const inputWithIcon = ref("");
const inputWithAddon = ref("");
</script>
```

### Props

| 参数名       | 说明       | 类型             | 默认值 |
| ------------ | ---------- | ---------------- | ------ |
| type         | 输入框类型 | string           | 'text' |
| modelValue   | 绑定值     | string \| number | ''     |
| placeholder  | 占位符     | string           | ''     |
| disabled     | 是否禁用   | boolean          | false  |
| clearable    | 是否可清空 | boolean          | -      |
| showPassword | 密码可见   | boolean          | false  |
| readonly     | 只读       | boolean          | false  |
| label        | 输入框标题 | string           | -      |

### Slots

| 插槽名     | 说明           |
| ---------- | -------------- |
| prepend    | 输入框前置内容 |
| append     | 输入框后置内容 |
| prefixIcon | 输入框头部图标 |
| suffixIcon | 输入框尾部图标 |

### Events

| 事件名            | 说明                     | 回调参数                                   |
| ----------------- | ------------------------ | ------------------------------------------ |
| update:modelValue | 输入框内容发生改变时触发 | (value: string) => value is string         |
| change            | 输入框内容发生改变时触发 | (value: string) => value is string         |
| input             | 输入框输入时触发         | (value: string) => value is string         |
| focus             | 输入框获得焦点时触发     | (e: FocusEvent) => e instanceof FocusEvent |
| blur              | 输入框失去焦点时触发     | (e: FocusEvent) => e instanceof FocusEvent |
| clear             | 清空内容时触发           | () => true                                 |
