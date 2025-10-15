<script setup lang="ts">
import { useForm } from 'vee-validate'
import { getErrorMessage, useLogin } from 'vue-core'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import Button from '@/components/ui/button/Button.vue'
import { FormField } from '@/components/ui/form'
import FormControl from '@/components/ui/form/FormControl.vue'
import FormItem from '@/components/ui/form/FormItem.vue'
import FormLabel from '@/components/ui/form/FormLabel.vue'
import FormMessage from '@/components/ui/form/FormMessage.vue'
import Input from '@/components/ui/input/Input.vue'
import { config } from '@/config'
import GuestLayout from '@/layouts/GuestLayout.vue'

const router = useRouter()
const { mutateAsync: login, isPending } = useLogin()

const { handleSubmit } = useForm({
  initialValues: {
    email: config.auth.defaults.userEmail ?? '',
    password: config.auth.defaults.userPassword ?? '',
  },
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await login({
      email: values.email,
      password: values.password
    })
    toast.success('Login successful!')
    router.push('/dashboard')
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
        Welcome back
      </h1>

      <p class="text-sm text-gray-500">
        Please enter your details to login.
      </p>

      <form class="flex flex-col gap-4 mt-4 w-full max-w-sm" @submit="onSubmit">
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

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                type="password"
                placeholder="••••••••"
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex justify-between items-center text-sm">
          <router-link to="/auth/forgot-password" class="text-blue-600 hover:underline">
            Forgot password?
          </router-link>
        </div>

        <Button type="submit" :disabled="isPending">
          {{ isPending ? 'Logging in...' : 'Login' }}
        </Button>

        <p class="text-sm text-center text-gray-500">
          Don't have an account?
          <router-link to="/auth/register" class="text-blue-600 hover:underline">
            Sign up
          </router-link>
        </p>
      </form>
    </div>
  </GuestLayout>
</template>
