<script setup lang="ts">
import { useForm } from 'vee-validate'
import { getErrorMessage, useRegister } from 'vue-core'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import Button from '@/components/ui/button/Button.vue'
import { FormField } from '@/components/ui/form'
import FormControl from '@/components/ui/form/FormControl.vue'
import FormItem from '@/components/ui/form/FormItem.vue'
import FormLabel from '@/components/ui/form/FormLabel.vue'
import FormMessage from '@/components/ui/form/FormMessage.vue'
import Input from '@/components/ui/input/Input.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'

const router = useRouter()
const { mutateAsync: register, isPending } = useRegister()

const { handleSubmit } = useForm({
  initialValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
})

const onSubmit = handleSubmit(async (values) => {
  // Validate password confirmation
  if (values.password !== values.confirmPassword) {
    toast.error('Passwords do not match')
    return
  }

  try {
    await register({
      name: values.name,
      email: values.email,
      password: values.password,
    })
    toast.success('Registration successful!')
    await router.push('/dashboard')
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
        Create an account
      </h1>

      <p class="text-sm text-gray-500">
        Enter your details to get started.
      </p>

      <form class="flex flex-col gap-4 mt-4 w-full max-w-sm" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                type="text"
                placeholder="John Doe"
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

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

        <FormField v-slot="{ componentField }" name="confirmPassword">
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
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

        <Button type="submit" :disabled="isPending">
          {{ isPending ? 'Creating account...' : 'Create account' }}
        </Button>

        <p class="text-sm text-center text-gray-500">
          Already have an account?
          <router-link to="/auth/login" class="text-blue-600 hover:underline">
            Sign in
          </router-link>
        </p>
      </form>
    </div>
  </GuestLayout>
</template>

