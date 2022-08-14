<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <h1>KuaiZhao</h1>
      <nav>
        <RouterLink to="/">Snaps</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView default="/" />
</template>

<style scoped></style>
