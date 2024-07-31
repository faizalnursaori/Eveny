import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen bg-base-200">
      <section className="flex flex-1 flex-col justify-center px-4 lg:px-20">
        <div className="space-y-4">
          <p className="text-4xl font-light text-base-content">Welcome</p>
          <p className="text-5xl leading-tight text-base-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </section>
      <section className="flex flex-1 items-center justify-center py-8">
        {children}
      </section>
    </main>
  );
}
