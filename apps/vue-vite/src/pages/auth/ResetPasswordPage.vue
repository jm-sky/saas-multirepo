<script setup lang="ts">
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import { getErrorMessage, useResetPassword } from 'vue-core'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import Button from '@/components/ui/button/Button.vue'
import { FormField } from '@/components/ui/form'
import FormControl from '@/components/ui/form/FormControl.vue'
import FormItem from '@/components/ui/form/FormItem.vue'
import FormLabel from '@/components/ui/form/FormLabel.vue'
import FormMessage from '@/components/ui/form/FormMessage.vue'
import Input from '@/components/ui/input/Input.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'

const route = useRoute()
const router = useRouter()
const { mutateAsync: resetPassword, isPending } = useResetPassword()
const success = ref(false)

// Get token from URL query parameter
const token = computed(() => route.query.token as string || '')

const { handleSubmit } = useForm({
  initialValues: {
    newPassword: '',
    confirmPassword: '',
  },
})

const onSubmit = handleSubmit(async (values) => {
  // Validate token exists
  if (!token.value) {
    toast.error('Invalid or missing reset token')
    return
  }

  // Validate password confirmation
  if (values.newPassword !== values.confirmPassword) {
    toast.error('Passwords do not match')
    return
  }

  try {
    await resetPassword({
      token: token.value,
      newPassword: values.newPassword,
    })
    success.value = true
    toast.success('Password reset successful!')

    // Redirect to login after 2 seconds
    setTimeout(async () => {
      await router.push('/auth/login')
    }, 2000)
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error)
    toast.error(errorMessage)
    console.error(error)
  }
})
</script>

<template>
  <GuestLayout>
    <div class="flex flex-col items-center justify-center gap-2 h-full">
      <h1 class="text-2xl font-bold">
        Reset your password
      </h1>

      <p class="text-sm text-gray-500 text-center max-w-md">
        Enter your new password below.
      </p>

      <div v-if="success" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg max-w-md">
        <p class="text-sm text-green-800">
          <strong>Success!</strong><br>
          Your password has been reset. Redirecting to login...
        </p>
      </div>

      <form v-else class="flex flex-col gap-4 mt-4 w-full max-w-sm" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="newPassword">
          <FormItem>
            <FormLabel>New Password</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                type="password"
                placeholder="••••••••"
                required
                minlength="8"
              />
            </FormControl>
            <FormMessage />
            <p class="text-xs text-gray-500">
              Minimum 8 characters
            </p>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="confirmPassword">
          <FormItem>
            <FormLabel>Confirm New Password</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                type="password"
                placeholder="••••••••"
                required
                minlength="8"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" :disabled="isPending || !token">
          {{ isPending ? 'Resetting...' : 'Reset password' }}
        </Button>

        <router-link to="/auth/login" class="text-sm text-center text-gray-500 hover:text-gray-700">
          Back to login
        </router-link>
      </form>
    </div>
  </GuestLayout>
</template>

