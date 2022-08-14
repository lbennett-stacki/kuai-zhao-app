<script setup lang="ts">
import { formatDistance } from "date-fns";
import { useSnapsStore, Snap } from "../stores/snaps";
import RecognitionsList from "./RecognitionsList.vue";

const { snap } = defineProps<{ snap: Snap }>();

const store = useSnapsStore();

const src = `http://localhost:3001/snaps/${snap.name}`;
const createdAtRelative = formatDistance(new Date(snap.createdAt), new Date());
</script>

<template>
  <div class="item">
    <div class="header">
      <span>Snap #{{ snap.id }}</span>
      <span>Snapped {{ createdAtRelative }}</span>
    </div>
    <div class="body">
      <img :src="src" />
      <div>
        <RecognitionsList :recognitions="snap.recognitions" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  background: var(--color-background-soft);
  border-radius: 32px;
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
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  padding: 16px 32px;
}
.body {
  padding: 16px 24px;
}
</style>
