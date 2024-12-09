<script lang="ts" setup>
const questions = await $fetch(
  "http://localhost:8998/api/v1/questions/get-all/6753cbd6ed7e531cefde6017?a_email=aritra@gdgoctiu.com&a_pass=RJiQ$jwzeOQrR$z9"
);
</script>

<template>
  <pre>
    {{ JSON.stringify(questions, null, 2) }}
  </pre>
</template>
