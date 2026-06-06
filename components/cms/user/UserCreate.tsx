"use client";
import { useAuth } from "@/context/hooks/useAuth";
import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Check, Loader2, ArrowLeft } from "lucide-react";
import { InputType } from "@/lib/types/GlobalTypes";
import { FormLabel } from "../../../components/form/label";
import { TextInput } from "../../../components/form/input";
import { registerSchema } from "@/lib/dto/AuthDTO";

type RegisterFormData = z.infer<typeof registerSchema>;

export default function UserCreate() {
  const { isLoading, register } = useAuth();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register(data);
      toast.success("User created successfully");
      router.push("/admin/users");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Failed to create user");
    }
  };

  const onError = (errors: any) => {
    console.error("Form validation errors:", errors);
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 p-8 sm:p-10 my-2 relative">
      <div className="absolute top-6 left-6">
        <Link href="/admin/users" className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
      </div>

      <div className="space-y-1 mb-4 flex flex-col items-center pt-4">
        <h2 className="text-2xl font-semibold text-gray-800">Create New User</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-1">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
            {/* Username */}
            <div>
              <FormLabel htmlFor="username" labelText="Username" required />
              <TextInput
                name="username"
                control={control}
                placeholder="Enter username"
                errMsg={errors.username?.message}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <FormLabel htmlFor="email" labelText="Email Address" required />
            <TextInput
              name="email"
              type={InputType.EMAIL}
              control={control}
              placeholder="Enter email"
              errMsg={errors.email?.message}
            />
          </div>

          {/* Password */}
          <div>
            <FormLabel htmlFor="password" labelText="Password" required />
            <TextInput
              name="password"
              type={InputType.PASSWORD}
              control={control}
              placeholder="Enter password"
              errMsg={errors.password?.message}
            />
          </div>
          <div>
            <FormLabel htmlFor="confirmPassword" labelText=" Confirm Password" required />
            <TextInput
              name="confirmPassword"
              type={InputType.PASSWORD}
              control={control}
              placeholder="Confirm password"
              errMsg={errors.confirmPassword?.message}
            />
          </div>
        </div>

        <div className="pt-4 flex flex-col gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 py-3.5 px-4 
            rounded-xl bg-linear-to-r from-teal-600 to-teal-500
             hover:from-teal-700 hover:to-teal-600 text-white 
             font-semibold shadow-lg shadow-teal-500/20 
             hover:shadow-teal-500/30 active:scale-[0.98] 
             transition-all duration-200 disabled:opacity-70
              disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Check size={20} />}
            {isLoading ? "Creating User..." : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
}
