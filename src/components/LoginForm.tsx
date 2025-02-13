import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import useAuthStore from '@/store/auth'; // ✅ Import Zustand Store

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") || "/profile";

  const setToken = useAuthStore((state) => state.setToken); // ✅ Gunakan Zustand untuk menyimpan token

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await authClient.signIn({
        email: values.email,
        password: values.password,
      });

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Login failed.",
          description: result.error.message,
        });
      } else if (result.data?.token) {
        setToken(result.data.token); // ✅ Simpan token ke Zustand
        toast({
          description: "Login successful!",
        });
        navigate(from); // Arahkan ke halaman sebelum login
      } else {
        toast({
          variant: "destructive",
          title: "Unexpected error",
          description: "Token is missing from the response.",
        });
      };

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn@example.com" {...field} type="email" disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type="password" disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && (
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v2M12 20v2M5.07 5.07 6.5 6.5M17.5 17.5 18.93 18.93M2 12h2M20 12h2M5.07 18.93 6.5 17.5M17.5 6.5 18.93 5.07" />
            </svg>
          )}
          Login
        </Button>

        {/* Tambahkan tautan ke register page */}
        <p className="text-sm mt-2">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
