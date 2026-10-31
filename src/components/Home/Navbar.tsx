"use client";

import {
  ArrowRight,
  CalendarCheck,
  CalendarCog,
  CalendarDays,
  CalendarPlus,
  ChevronDown,
  ChevronUp,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import ThemeToggle from "../Home/ThemeToggle";
import { Button } from "../ui/button";

const navLinks = [
  {
    name: "Upcoming Events",
    href: "/events",
    icon: CalendarDays,
  },
];

const profileLinks = [
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

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Separate refs for desktop and mobile profile sections
  const desktopProfileRef = useRef<HTMLDivElement>(null);
  const mobileProfileRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = !!session?.user;

  // Close mobile menu and profile popover
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await authClient.signOut();

      toast.success("Logged out successfully!");

      closeMenu();
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Failed to log out. Please try again.");
    }
  };

  // Close profile popover when clicking outside
  useEffect(() => {
    if (!isProfileOpen) return;

    const handleClickOutside = (event: PointerEvent) => {
      const target = event.target as Node;

      const isInsideDesktop = desktopProfileRef.current?.contains(target);

      const isInsideMobile = mobileProfileRef.current?.contains(target);

      if (!isInsideDesktop && !isInsideMobile) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isProfileOpen]);

  // Close menus when navigating to another page
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md transition-colors duration-300 dark:border-gray-800 dark:bg-gray-950/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2">
          <Image
            src="/assets/TogetherWeCan.png"
            alt="TogetherWeCan Logo"
            width={55}
            height={55}
            priority
            className="object-contain"
          />

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Together
              <span className="text-green-600 dark:text-green-400">WeCan</span>
            </h1>
            <p className="text-[10px] font-medium tracking-wide text-gray-500 dark:text-gray-400">
              Connect. Participate. Make a Difference.
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 text-md font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-green-700 dark:text-green-400"
                    : "text-gray-700 hover:text-green-700 dark:text-gray-300 dark:hover:text-green-400"
                }`}>
                <link.icon size={17} />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />

          {!isPending && (
            <>
              {isLoggedIn && session ? (
                <>
                  {/* Desktop Profile Image and Popover */}
                  <div ref={desktopProfileRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setIsProfileOpen((previous) => !previous)}
                      aria-label="Toggle profile menu"
                      aria-expanded={isProfileOpen}
                      className="flex cursor-pointer items-center gap-2 rounded-full transition duration-300 hover:opacity-80"
                      title={session.user.name || "User Profile"}>
                      <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-green-600 bg-green-100 shadow-sm transition duration-300 hover:scale-105 hover:shadow-md dark:border-green-400 dark:bg-green-950">
                        {session.user.image ? (
                          <Image
                            src={session.user.image}
                            alt={session.user.name || "User profile"}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <span className="font-bold text-green-800 dark:text-green-300">
                            {session.user.name?.charAt(0).toUpperCase() || "U"}
                          </span>
                        )}
                      </div>

                      {isProfileOpen ? (
                        <ChevronUp
                          size={18}
                          className="text-gray-600 transition-transform duration-200 dark:text-gray-300"
                        />
                      ) : (
                        <ChevronDown
                          size={18}
                          className="text-gray-600 transition-transform duration-200 dark:text-gray-300"
                        />
                      )}
                    </button>

                    {/* Desktop Profile Popover */}

                    {isProfileOpen && (
                      <div className="absolute right-0 top-full z-[60] mt-3 w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-200 dark:border-gray-700 dark:bg-gray-900 dark:ring-white/10">
                        {/* Profile Header */}
                        <div className="bg-gray-50 p-4 dark:bg-gray-800/70">
                          <div className="flex items-center gap-3">
                            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-green-600 bg-green-100 dark:border-green-400 dark:bg-green-950">
                              {session.user.image ? (
                                <Image
                                  src={session.user.image}
                                  alt={session.user.name || "User profile"}
                                  fill
                                  unoptimized
                                  className="object-cover"
                                />
                              ) : (
                                <span className="text-lg font-bold text-green-800 dark:text-green-300">
                                  {session.user.name?.charAt(0).toUpperCase() ||
                                    "U"}
                                </span>
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-bold text-gray-900 dark:text-white">
                                {session.user.name || "User"}
                              </p>
                              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                                {session.user.email}
                              </p>
                            </div>
                          </div>

                          <Link
                            href="/profile"
                            onClick={() => setIsProfileOpen(false)}
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-green-200 bg-white px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-50 dark:border-green-900 dark:bg-gray-900 dark:text-green-400 dark:hover:bg-gray-800">
                            View Profile
                            <ArrowRight size={14} />
                          </Link>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700" />

                        {/* Event Navigation */}
                        <div className="p-2">
                          <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            Manage Activities
                          </p>

                          {profileLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;

                            return (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsProfileOpen(false)}
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                                  isActive
                                    ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                                    : "text-gray-700 hover:bg-green-50 hover:text-green-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-green-400"
                                }`}>
                                <Icon
                                  size={17}
                                  className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                                />
                                {link.name}
                              </Link>
                            );
                          })}
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700" />

                        {/* Logout */}
                        <div className="p-2">
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40">
                            <LogOut
                              size={17}
                              className="transition-transform duration-200 group-hover:translate-x-0.5"
                            />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Existing Desktop Logout Button */}
                  <Button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700">
                    <LogOut size={16} />
                    Logout
                  </Button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700">
                  Sign In
                  <ArrowRight size={16} />
                </Link>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          type="button"
          onClick={() => {
            setIsMenuOpen((previous) => !previous);
            setIsProfileOpen(false);
          }}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 md:hidden">
          {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
        </Button>
      </nav>

      {/* Mobile Navigation */}

      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 shadow-lg dark:border-gray-800 dark:bg-gray-950 md:hidden">
          <div className="flex flex-col gap-3">
            {/* Mobile Navigation Links */}
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-green-400"
                  }`}>
                  <Icon size={18} />
                  {link.name}
                </Link>
              );
            })}

            <div className="my-1 border-t border-gray-200 dark:border-gray-800" />

            {/* Mobile Theme Toggle */}
            <div className="flex items-center justify-between rounded-xl px-3 py-2">
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Appearance
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Change your theme
                </p>
              </div>
              <ThemeToggle />
            </div>

            {!isPending && (
              <>
                {isLoggedIn && session ? (
                  <>
                    {/* Mobile Profile and Popover */}
                    <div
                      ref={mobileProfileRef}
                      className="relative mt-1 rounded-xl border border-gray-200 bg-gray-50 p-3 transition-colors dark:border-gray-700 dark:bg-gray-900">
                      {/* Profile Trigger */}
                      <button
                        type="button"
                        onClick={() =>
                          setIsProfileOpen((previous) => !previous)
                        }
                        aria-label="Toggle profile menu"
                        aria-expanded={isProfileOpen}
                        className="flex w-full cursor-pointer items-center justify-between gap-3 text-left">
                        <div className="flex min-w-0 items-center gap-3">
                          {/* Profile Image */}
                          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-green-600 bg-green-100 shadow-sm dark:border-green-400 dark:bg-green-950">
                            {session.user.image ? (
                              <Image
                                src={session.user.image}
                                alt={session.user.name || "User profile"}
                                fill
                                unoptimized
                                className="object-cover"
                              />
                            ) : (
                              <span className="text-base font-bold text-green-800 dark:text-green-300">
                                {session.user.name?.charAt(0).toUpperCase() ||
                                  "U"}
                              </span>
                            )}
                          </div>

                          {/* User Information */}
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-gray-900 dark:text-white">
                              {session.user.name}
                            </p>
                            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                              {session.user.email}
                            </p>
                          </div>
                        </div>

                        {/* Toggle Arrow */}
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition-colors dark:bg-gray-800 dark:text-gray-300">
                          {isProfileOpen ? (
                            <ChevronUp size={18} />
                          ) : (
                            <ChevronDown size={18} />
                          )}
                        </div>
                      </button>

                      {/* Mobile Profile Popover */}

                      {isProfileOpen && (
                        <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm animate-in fade-in slide-in-from-top-2 duration-200 dark:border-gray-700 dark:bg-gray-950">
                          {/* View Profile */}
                          <Link
                            href="/profile"
                            onClick={closeMenu}
                            className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50 dark:text-green-400 dark:hover:bg-gray-800">
                            <span className="flex items-center gap-3">
                              <UserRound size={18} />
                              View Profile
                            </span>
                            <ArrowRight size={16} />
                          </Link>

                          <div className="border-t border-gray-200 dark:border-gray-700" />

                          {/* Event Links */}
                          <div className="p-2">
                            <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                              Manage Activities
                            </p>

                            {profileLinks.map((link) => {
                              const Icon = link.icon;
                              const isActive = pathname === link.href;

                              return (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  onClick={closeMenu}
                                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                                    isActive
                                      ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                                      : "text-gray-700 hover:bg-green-50 hover:text-green-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-green-400"
                                  }`}>
                                  <Icon size={18} />
                                  {link.name}
                                </Link>
                              );
                            })}
                          </div>

                          <div className="border-t border-gray-200 dark:border-gray-700" />

                          {/* Logout */}
                          <div className="p-2">
                            <button
                              type="button"
                              onClick={handleLogout}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40">
                              <LogOut size={18} />
                              Logout
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  /* Login Button */
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-green-700 active:scale-[0.98]">
                    Sign In
                    <ArrowRight size={16} />
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
