<script setup lang="ts">
import { onMounted, ref } from "vue-demi";
import SnapList from "../components/SnapsList.vue";
import { useSnapsStore } from "../stores/snaps";

const store = useSnapsStore();
const isLoading = ref(false);

async function fetchSnaps() {
  isLoading.value = true;
  await store.fetchSnaps();
  isLoading.value = false;
}

onMounted(async () => {
  await fetchSnaps();
});
</script>

<template>
  <main>
    <h2>Snaps ({{ store.snaps.length }})</h2>
    <button @click="fetchSnaps">
      {{ isLoading ? "Reloading..." : "Reload" }}
    </button>
    <SnapList />
  </main>
</template>
