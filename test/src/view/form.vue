<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance } from "@aeolian-design/components/components/form";

defineOptions({
  name: "test-form",
});

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
        <template #label> 用户名 </template>
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
        <template #label> 密码 </template>
      </ao-form-item>
      <ao-button type="primary" @click="validateForm"> 校验 </ao-button>
    </ao-form>
  </div>
</template>

<style scoped></style>
