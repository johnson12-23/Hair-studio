"use client";

import { useAuth } from "@/lib/admin/auth-context";
import { Bell, User } from "lucide-react";

interface NavbarProps {
  title: string;
}

export function AdminNavbar({ title }: NavbarProps) {
  const { user } = useAuth();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <h1 className="text-xl font-bold text-black sm:text-2xl">{title}</h1>

        <div className="flex items-center gap-2 sm:gap-6">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            <Bell size={20} className="text-gray-600" />
          </button>

          <div className="flex items-center gap-3 border-l border-gray-200 pl-3 sm:pl-6">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-black">{user?.name}</p>
              <p className="text-xs text-gray-600">{user?.email}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-orange-400 rounded-full flex items-center justify-center">
              <User size={18} className="text-black" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
