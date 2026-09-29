"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Mail,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/admin/auth-context";

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: Home },
    { href: "/admin/messages", label: "Messages", icon: Mail },
    { href: "/admin/bookings", label: "Bookings", icon: Calendar },
    { href: "/admin/settings", label: "Settings", icon: Settings }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-3 top-3 z-50 rounded-lg border border-gray-200 bg-white p-2 shadow-sm lg:hidden"
        aria-label="Toggle admin menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 max-w-[85vw] bg-black text-white transition-transform duration-300 transform lg:relative lg:w-64 lg:max-w-none lg:translate-x-0 lg:flex-shrink-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-white/10 p-6">
            <h1 className="text-xl font-bold text-gold">Abena Admin</h1>
            <p className="mt-1 text-xs text-white/60">Hair Studio</p>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                    active
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:bg-white/10"
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-4">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-white/70 transition hover:bg-white/10"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
