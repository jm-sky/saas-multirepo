<script setup lang="ts">
import LogoText from '@/components/layout/LogoText.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen items-center justify-center p-4 bg-background">
    <div class="my-4">
      <LogoText />
    </div>
    <div class="container w-full max-w-md mx-auto min-h-64 border rounded-xl p-6 bg-card shadow-lg">
      <slot />
    </div>
  </div>
</template>
