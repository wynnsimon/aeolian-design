<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "test-input",
});

const username = ref("aeolian");
</script>

<template>
  <div>
    {{ username }}
    <ao-input
      v-model="username"
      placeholder="请输入用户名"
      @blur="(e) => console.log(e)"
      @focus="(e) => console.log(e)"
      :show-password="true"
    >
      <template #prepend>aeolian</template>
      <template #prefixIcon>
        <ao-icon>
          <AppleOutlined />
        </ao-icon>
      </template>
      <template #suffixIcon>
        <ao-icon>
          <AppleOutlined />
        </ao-icon>
      </template>
      <template #append> design </template>
    </ao-input>
  </div>
</template>

<style scoped></style>
