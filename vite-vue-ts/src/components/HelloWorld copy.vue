<script setup lang="ts">
import { ref } from "vue";
import styles from "./1.module.styl";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <div :class="styles.div">1234</div>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<style scoped lang="stylus">

.read-the-docs {
  color: #888;
  text-decoration: dashed;
}
</style>
