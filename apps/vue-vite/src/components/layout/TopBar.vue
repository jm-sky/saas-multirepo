<script setup lang="ts">
import { useIsAuthenticated, useLogout } from 'vue-core'
import LogoText from '@/components/layout/LogoText.vue'
import Button from '@/components/ui/button/Button.vue'

const { isAuthenticated } = useIsAuthenticated()
const { mutateAsync: logout } = useLogout()
</script>

<template>
  <div class="border-b">
    <div class="container mx-auto flex justify-between items-center gap-4 py-2">
      <div class="flex items-center gap-4">
        <RouterLink to="/">
          <LogoText />
        </RouterLink>
      </div>
      <div class="flex items-center justify-end gap-4">
        <Button v-if="isAuthenticated" variant="outline" @click="async () => await logout()">
          Logout
        </Button>
        <RouterLink
          v-else
          v-slot="{ href, navigate }"
          custom
          to="/login"
        >
          <Button
            as="a"
            :href="href"
            variant="outline"
            @click="navigate"
          >
            Login
          </Button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
