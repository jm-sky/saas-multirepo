<script setup lang="ts">
import { config } from '@/config'
</script>

<template>
  <div class="flex items-center gap-2">
    <span class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-purple-500 to-violet-500">
      {{ config.app.name }}
    </span>
  </div>
</template>
