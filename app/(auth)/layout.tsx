import { ReactNode } from "react";
import { LoginLayout } from "@/components/layout/loginFormPage";

export default function AuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <LoginLayout>{children}</LoginLayout>;
}
