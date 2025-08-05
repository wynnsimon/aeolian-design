<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "test-collapse",
});

const modelValue = ref(["a"]);
const modelValue1 = ref(["a"]);

</script>

<template>
  <div>
    {{ modelValue }}
    <ao-collapse v-model="modelValue">
      <ao-collapse-item name="a">
        <template #title>
          <h1>标题1</h1>
        </template>
        <!-- <h1>标题2</h1> -->
        <div>11111111111111111111111111111111111111111111111111111111111</div>
      </ao-collapse-item>
      <ao-collapse-item name="b" title="标题3">
        <div>3333333333333333333333333333333333333333333333333333333333</div>
      </ao-collapse-item>
      <ao-collapse-item name="c" title="标题4" disabled>
        <div>444444444444444444444444444444444444444444444444444444444</div>
      </ao-collapse-item>
    </ao-collapse>

    <ao-collapse v-model="modelValue1" accordion>
      <ao-collapse-item name="a">
        <template #title>
          <h1>标题1</h1>
        </template>
        <!-- <h1>标题2</h1> -->
        <div>11111111111111111111111111111111111111111111111111111111111</div>
      </ao-collapse-item>
      <ao-collapse-item name="b" title="标题3">
        <div>3333333333333333333333333333333333333333333333333333333333</div>
      </ao-collapse-item>
      <ao-collapse-item name="c" title="标题4" disabled>
        <div>444444444444444444444444444444444444444444444444444444444</div>
      </ao-collapse-item>
    </ao-collapse>
  </div>
</template>

<style scoped></style>
