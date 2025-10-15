'use client';

// Login form component with validation and loading states

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';
import { getErrorMessage } from '@/lib/error-guards';
import { LoginSchema, type LoginFormData } from '@/lib/validations';
import { AUTH_CONFIG } from '@/lib/auth-config';

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setSuccessMessage(null);

    try {
      await login(data);
      setSuccessMessage('Login successful! Redirecting...');
      setIsRedirecting(true);
      
      // Small delay to show success message
      setTimeout(() => {
        router.push(AUTH_CONFIG.loginRedirect);
      }, 500);
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
      setIsRedirecting(false);
    }
  };

  const isFormLoading = isLoading || isSubmitting || isRedirecting;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}
          
          {successMessage && (
            <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
              {successMessage}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              disabled={isFormLoading}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button
                variant="link"
                className="p-0 h-auto text-sm"
                disabled={isFormLoading}
                asChild
              >
                <Link href="/forgot-password">Forgot password?</Link>
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              disabled={isFormLoading}
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isFormLoading}>
            {isRedirecting ? 'Redirecting...' : isLoading ? 'Authenticating...' : isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Button
              variant="link"
              className="p-0 h-auto"
              disabled={isFormLoading}
              asChild
            >
              <Link href="/register">Sign up</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
