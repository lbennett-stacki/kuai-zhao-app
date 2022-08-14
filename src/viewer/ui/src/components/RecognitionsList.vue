<script setup lang="ts">
import { Recognition } from "../stores/snaps";
import RecognitionItem from "./RecognitionItem.vue";

const { recognitions } = defineProps<{ recognitions: Recognition[] }>();
</script>

<template>
  <div class="list">
    <div v-for="recognition in recognitions" :key="recognition.id" class="item">
      <RecognitionItem :recognition="recognition" />
    </div>
  </div>
</template>

<style scoped>
.item {
  margin: 8px 0;
}
.list {
  padding-top: 8px;
}
</style>
