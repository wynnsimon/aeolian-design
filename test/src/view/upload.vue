<script setup lang="ts">
defineOptions({
  name: "test-upload",
});
</script>

<template>
  <div>
    <ao-upload
      upload-url="http://localhost:8000/upload"
      merge-url="http://localhost:8000/upload_end"
      verify-url="http://localhost:8000/upload_verify"
    >
    </ao-upload>
  </div>
</template>

<style scoped></style>
