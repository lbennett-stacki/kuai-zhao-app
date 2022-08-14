<script setup lang="ts">
import { Translation } from "../stores/snaps";
import TranslationItem from "./TranslationItem.vue";

const { translations } = defineProps<{ translations: Translation[] }>();
</script>

<template>
  <div class="list">
    <div v-for="translation in translations" :key="translation.id" class="item">
      <TranslationItem :translation="translation" />
    </div>
  </div>
</template>

<style scoped>
.item {
  margin: 4px 0;
}
.list {
  padding-top: 4px;
}
</style>
