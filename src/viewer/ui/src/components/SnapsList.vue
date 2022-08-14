<script setup lang="ts">
import { useSnapsStore } from "../stores/snaps";
import SnapItem from "./SnapItem.vue";

const store = useSnapsStore();
</script>

<template>
  <div class="list">
    <div v-for="snap in store.snaps" :key="snap.id" class="item">
      <SnapItem :snap="snap" />
    </div>
  </div>
</template>

<style scoped>
.item {
  margin: 16px 0;
}
.list {
  padding-top: 16px;
}
</style>
