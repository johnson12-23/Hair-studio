"use client";

import { useAuth } from "@/lib/admin/auth-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/admin/login" && !isLoading && !user) {
      router.push("/admin/login");
    }
  }, [pathname, user, isLoading, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full" />
          </div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden pt-16 lg:pt-0">
        {children}
      </div>
    </div>
  );
}
