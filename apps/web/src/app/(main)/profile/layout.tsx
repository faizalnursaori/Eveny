import { ReactNode } from "react";
import ProfileSidebar from "@/components/ProfileSidebar";


interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="flex">
      <div className="hidden md:block h-[100vh] w-[300px]">
        <ProfileSidebar/>
      </div>
      <div className="p-5 w-full md:max-w-[1140px]">
      {children}
      </div>
    </main>
  );
}