<script setup lang="ts">
import TopBar from '@/components/layout/TopBar.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TopBar />
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>
