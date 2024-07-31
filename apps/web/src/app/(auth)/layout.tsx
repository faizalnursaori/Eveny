import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main>
      <div className="flex min-h-screen items-stretch justify-center [&>*]:flex-1 [&>section>*]:w-full">
        {children}
      </div>
    </main>
  );
}
