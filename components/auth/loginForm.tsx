"use client";
import { useAuth } from "@/context/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, LogIn, Mail, Lock } from "lucide-react";
import { Logo } from "../common/logo";
import { TextInput } from "../form/input";
import { FormLabel } from "../form/label";
import { loginSchema } from "@/lib/dto/AuthDTO";

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { login, isLoading } = useAuth()
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login({
        email: data.email, // Assuming username field in form is email
        password: data.password
      });
      toast.success("Login Successful!");
      router.push("/admin");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 p-8 sm:p-10">
      <div className="mb-8 text-center flex flex-col items-center">
        <Logo className="mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome Back</h1>
        <p className="text-gray-500 mt-2 text-sm">Enter your credentials to access your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <FormLabel labelText="Email Address" htmlFor="email" />
          <TextInput
            name="email"
            control={control}
            type="email"
            icon={<Mail size={18} />}
            errMsg={errors.email?.message}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <FormLabel labelText="Password" htmlFor="password" />
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-teal-600 hover:text-teal-700 hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <TextInput
            type="password"
            placeholder="Enter your password"
            name="password"
            control={control}
            icon={<Lock size={18} />}
            errMsg={errors.password?.message}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl bg-linear-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-semibold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <LogIn size={20} />}
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </div>

      </form>
    </div>
  );
};
