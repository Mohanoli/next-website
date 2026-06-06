"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Check, Loader2, ArrowLeft } from "lucide-react";
import { InputType } from "@/lib/types/GlobalTypes";
import { FormLabel } from "../../../components/form/label";
import { TextInput } from "../../../components/form/input";
import axiosInstance from "../../../lib/config/AxiosConfig";

interface UserEditProps {
  userId: string;
}

export default function UserEdit({ userId }: UserEditProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      role: "",
      status: "",
      gender: "",
    },
  });

  useEffect(() => {
    if (userId) {
      setIsFetching(true);
      axiosInstance.get(`/auth/users/${userId}`)
        .then((response) => {
          const user = response?.data?.user;
          if (user) {
            reset({
              username: user.username || "",
              email: user.email || "",
              role: user.role || "",
              status: user.status || "",
              gender: user.gender || "",
            });
          }
        })
        .catch((error) => {
          toast.error("Failed to load user data");
          console.error(error);
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await axiosInstance.put(`/auth/users/${userId}`, data);
      toast.success("User updated successfully");
      router.push("/admin/users");
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error?.message || "Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-teal-600" size={32} />
      </div>
    );
  }

  return (
    <div className="w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 p-8 sm:p-10 my-2 relative">
      <div className="absolute top-6 left-6">
        <Link href="/admin/users" className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
      </div>

      <div className="space-y-1 mb-4 flex flex-col items-center pt-4">
        <h2 className="text-2xl font-semibold text-gray-800">Edit User</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Username */}
            <div>
              <FormLabel htmlFor="username" labelText="Username" required />
              <TextInput
                name="username"
                control={control}
                placeholder="Enter username"
                errMsg={errors.username?.message as string}
              />
            </div>
            {/* Email */}
            <div>
              <FormLabel htmlFor="email" labelText="Email Address" required />
              <TextInput
                name="email"
                type={InputType.EMAIL}
                control={control}
                placeholder="Enter email"
                errMsg={errors.email?.message as string}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Role */}
            <div>
              <FormLabel htmlFor="role" labelText="Role" />
              <TextInput
                name="role"
                control={control}
                placeholder="Admin, User..."
                errMsg={errors.role?.message as string}
              />
            </div>
            {/* Status */}
            <div>
              <FormLabel htmlFor="status" labelText="Status" />
              <TextInput
                name="status"
                control={control}
                placeholder="Active, Inactive"
                errMsg={errors.status?.message as string}
              />
            </div>
            {/* Gender */}
            <div>
              <FormLabel htmlFor="gender" labelText="Gender" />
              <TextInput
                name="gender"
                control={control}
                placeholder="Gender"
                errMsg={errors.gender?.message as string}
              />
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col gap-4">
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
            {isLoading ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
