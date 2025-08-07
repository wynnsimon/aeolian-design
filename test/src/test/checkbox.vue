<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'test-checkbox'
})

const check = ref(true);

</script>

<template>
<div>
      {{ check }}
    <ao-checkbox
      v-model="check"
      :disabled="false"
      :indeterminate="true"
      label="测试"
      @change="(value) => console.log(value)"
    ></ao-checkbox>

</div>
</template>

<style scoped>

</style>
