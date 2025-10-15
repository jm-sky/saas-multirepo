<script setup lang="ts">
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { getErrorMessage, useForgotPassword } from 'vue-core'
import { toast } from 'vue-sonner'
import Button from '@/components/ui/button/Button.vue'
import { FormField } from '@/components/ui/form'
import FormControl from '@/components/ui/form/FormControl.vue'
import FormItem from '@/components/ui/form/FormItem.vue'
import FormLabel from '@/components/ui/form/FormLabel.vue'
import FormMessage from '@/components/ui/form/FormMessage.vue'
import Input from '@/components/ui/input/Input.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'

const { mutateAsync: forgotPassword, isPending } = useForgotPassword()
const success = ref(false)

const { handleSubmit } = useForm({
  initialValues: {
    email: '',
  },
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await forgotPassword(values.email)
    success.value = true
    toast.success('Password reset email sent! Please check your inbox.')
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
        Forgot your password?
      </h1>

      <p class="text-sm text-gray-500 text-center max-w-md">
        No worries! Enter your email address and we'll send you a link to reset your password.
      </p>

      <div v-if="success" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg max-w-md">
        <p class="text-sm text-green-800">
          <strong>Email sent!</strong><br>
          We've sent a password reset link to your email. Please check your inbox and follow the instructions.
        </p>
        <router-link to="/auth/login" class="mt-4 inline-block text-sm text-blue-600 hover:underline">
          Back to login
        </router-link>
      </div>

      <form v-else class="flex flex-col gap-4 mt-4 w-full max-w-sm" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                type="email"
                placeholder="you@example.com"
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" :disabled="isPending">
          {{ isPending ? 'Sending...' : 'Send reset link' }}
        </Button>

        <router-link to="/auth/login" class="text-sm text-center text-gray-500 hover:text-gray-700">
          Back to login
        </router-link>
      </form>
    </div>
  </GuestLayout>
</template>

