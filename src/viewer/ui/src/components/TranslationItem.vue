<script setup lang="ts">
import { formatDistance } from "date-fns";
import { Translation } from "../stores/snaps";
import { translationEngineMap } from "../utils/engineMap";

const { translation } = defineProps<{ translation: Translation }>();
const createdAtRelative = formatDistance(
  new Date(translation.createdAt),
  new Date()
);
const engine = translationEngineMap[translation.engine];
</script>

<template>
  <div class="item">
    <div class="header">
      <span>Translation #{{ translation.id }}</span>
      <span>Translated {{ createdAtRelative }}</span>
    </div>
    <div class="body">
      <span>{{ translation.result }}</span>
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  background: var(--color-background-soft);
  border-radius: 8px;
  border: 1px solid var(--color-border);
}
.item:hover {
  border-color: var(--color-border-hover);
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: var(--color-background-mute);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 4px 8px;
}
.body {
  padding: 4px 6px;
}
</style>
