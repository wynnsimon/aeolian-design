# Form 表单

表单用于收集、校验和提交数据，是数据录入的重要组件。

## 使用

### 基础用法

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance } from "@aeolian-design/components/components/form";

const state = reactive({ username: "", password: "" });
const formRef = ref<FormInstance>();

function validateForm() {
  formRef.value
    ?.validate((valid, errors) => {
      console.log("回调函数的方式", valid, errors);
    })
    .then(() => {
      console.log("Promise的方式:校验成功");
    })
    .catch(() => {
      console.log("Promise的方式:校验失败");
    });
}
</script>

<div>
  <ao-form
    ref="formRef"
    :model="state"
    :rules="[
      {
        username: {
          min: 3,
          max: 10,
          message: '用户名长度在3-10个字符',
          trigger: ['blur', 'change'],
        },
      },
    ]"
  >
    <ao-form-item
      prop="username"
      label="用户名"
      :rules="[
        { required: true, message: '请输入用户名', trigger: 'blur' },
        {
          min: 3,
          max: 10,
          message: '用户名3-10位',
          trigger: ['blur', 'change'],
        },
      ]"
    >
      <ao-input
        placeholder="请输入用户名"
        v-model="state.username"
      ></ao-input>
    </ao-form-item>

<ao-form-item
      prop="password"
      label="密码"
      :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
    >
<ao-input
        placeholder="请输入密码"
        v-model="state.password"
        type="password"
      ></ao-input>
</ao-form-item>

  <ao-form-item>
    <ao-button type="primary" @click="validateForm"> 校验 </ao-button>
  </ao-form-item>

  </ao-form>
</div>

```vue
<template>
  <div>
    <ao-form
      ref="formRef"
      :model="state"
      :rules="[
        {
          username: {
            min: 3,
            max: 10,
            message: '用户名长度在3-10个字符',
            trigger: ['blur', 'change'],
          },
        },
      ]"
    >
      <ao-form-item
        prop="username"
        label="用户名"
        :rules="[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名3-10位',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <ao-input
          placeholder="请输入用户名"
          v-model="state.username"
        ></ao-input>
      </ao-form-item>

      <ao-form-item
        prop="password"
        label="密码"
        :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
      >
        <ao-input
          placeholder="请输入密码"
          v-model="state.password"
          type="password"
        ></ao-input>
      </ao-form-item>
      <ao-button type="primary" @click="validateForm"> 校验 </ao-button>
    </ao-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance } from "@aeolian-design/components/components/form";

const state = reactive({ username: "", password: "" });
const formRef = ref<FormInstance>();

function validateForm() {
  formRef.value
    ?.validate((valid, errors) => {
      console.log("回调函数的方式", valid, errors);
    })
    .then(() => {
      console.log("Promise的方式:校验成功");
    })
    .catch(() => {
      console.log("Promise的方式:校验失败");
    });
}
</script>
```

### Form Props

| 参数名      | 说明                 | 类型      | 默认值 |
| ----------- | -------------------- | --------- | ------ |
| model       | 表单数据对象         | `Object`  | -      |
| rules       | 表单验证规则         | `Array`   | -      |
| showMessage | 是否显示校验错误信息 | `boolean` | `true` |

### Form Methods

| 方法名   | 说明                                      | 参数                                                                       |
| -------- | ----------------------------------------- | -------------------------------------------------------------------------- |
| validate | 对整个表单进行校验,同时支持回调和 promise | `Function(callback?: (valid: boolean, fields?: Values) => void)=> Promise` |

### FormItem Props

| 参数名      | 说明                                                                           | 类型      | 默认值 |
| ----------- | ------------------------------------------------------------------------------ | --------- | ------ |
| prop        | 表单域 model 字段名，在使用 validate、resetFields 方法的情况下，该属性是必填的 | `string`  | -      |
| label       | 标签文本                                                                       | `string`  | -      |
| rules       | 表单验证规则                                                                   | `Array`   | -      |
| showMessage | 是否显示校验错误信息                                                           | `boolean` | `true` |

### FormItem Slots

| 插槽名  | 说明       |
| ------- | ---------- |
| default | 表单项内容 |
| label   | 标签内容   |
