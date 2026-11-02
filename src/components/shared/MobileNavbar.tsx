"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  CalendarPlus,
  CalendarCog,
  CalendarCheck,
  ChevronDown,
  LogIn,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "../Home/ThemeToggle";

interface MobileNavbarProps {
  isLoggedIn: boolean;
  isPending: boolean;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  onLogout: () => void;
}

const navLinks = [
  {
    name: "Upcoming Events",
    href: "/events",
    icon: CalendarDays,
  },
];

const profileLinks = [
  {
    name: "View Profile",
    href: "/profile",
    icon: UserRound,
  },
  {
    name: "Create Event",
    href: "/events/create",
    icon: CalendarPlus,
  },
  {
    name: "Manage Event",
    href: "/events/manage",
    icon: CalendarCog,
  },
  {
    name: "Joined Event",
    href: "/events/joined",
    icon: CalendarCheck,
  },
];

export default function MobileNavbar({
  isLoggedIn,
  isPending,
  user,
  onLogout,
}: MobileNavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <div className="relative flex items-center gap-2 md:hidden">
      <ThemeToggle />

      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="h-8 w-8 rounded-full border-green-200 bg-green-50 text-green-700 hover:bg-green-100 dark:border-green-800 dark:bg-green-950 dark:text-green-400 dark:hover:bg-green-900">
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {isMenuOpen && (
        <div className="absolute right-0 top-12 z-50 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-green-100 bg-white shadow-xl dark:border-green-900 dark:bg-gray-950">
          <div className="space-y-1 p-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400"
                      : "text-gray-700 hover:bg-green-50 dark:text-gray-300 dark:hover:bg-green-950"
                  }`}>
                  <Icon size={18} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-gray-100 p-3 dark:border-gray-800">
            {isPending ? (
              <div className="px-4 py-3 text-sm text-gray-500">Loading...</div>
            ) : isLoggedIn && user ? (
              <>
                <button
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-green-50 dark:hover:bg-green-950">
                  <div className="flex min-w-0 items-center gap-3">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={36}
                        height={36}
                        unoptimized
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700 dark:bg-green-900 dark:text-green-300">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-100">
                        {user.name || "User"}
                      </p>
                      <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-gray-500 transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <div className="mt-2 space-y-1 border-l-2 border-green-200 pl-3 dark:border-green-800">
                    {profileLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = pathname === link.href;

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={closeMenu}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                            isActive
                              ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400"
                              : "text-gray-600 hover:bg-green-50 dark:text-gray-300 dark:hover:bg-green-950"
                          }`}>
                          <Icon size={17} />
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>
                )}

                <Button
                  onClick={() => {
                    closeMenu();
                    onLogout();
                  }}
                  variant="ghost"
                  className="mt-2 w-full justify-start gap-3 rounded-lg px-4 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950">
                  <LogOut size={18} />
                  Logout
                </Button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950">
                <LogIn size={18} />
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
