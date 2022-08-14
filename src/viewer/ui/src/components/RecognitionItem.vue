<script setup lang="ts">
import { formatDistance } from "date-fns";
import { Recognition } from "../stores/snaps";
import { recognitionEngineMap } from "../utils/engineMap";
import TranslationsList from "./TranslationsList.vue";

const { recognition } = defineProps<{ recognition: Recognition }>();
const createdAtRelative = formatDistance(
  new Date(recognition.createdAt),
  new Date()
);
const engine = recognitionEngineMap[recognition.engine];
</script>

<template>
  <div class="item">
    <div class="header">
      <span>Recognition #{{ recognition.id }}</span>
      <span>Recognised by {{ engine }} {{ createdAtRelative }}</span>
    </div>
    <div class="body">
      <span>{{ recognition.result }}</span>
      <div>
        <TranslationsList :translations="recognition.translations" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  background: var(--color-background-soft);
  border-radius: 16px;
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
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 8px 16px;
}
.body {
  padding: 8px 12px;
}
</style>
