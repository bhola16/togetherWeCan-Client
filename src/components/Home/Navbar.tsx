"use client";

import {
  ArrowRight,
  CalendarDays,
  Home,
  Menu,
  PlusCircle,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Upcoming Events",
    href: "/Upcomingevents",
    icon: CalendarDays,
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-100 bg-white/95 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo and Website Name */}
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex items-center gap-2.5">
          <Image
            src="/assets/TogetherWeCan.png"
            alt="TogetherWeCan Logo"
            width={55}
            height={55}
            priority
            className="rounded-2xl bg-green-200 object-contain transition duration-300 group-hover:scale-105"
          />

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
              Together
              <span className="text-green-600">WeCan</span>
            </h1>

            <p className="text-[10px] font-medium tracking-widest text-gray-500">
              SMALL ACTIONS. GREATER IMPACT.
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative flex items-center gap-2 py-2 text-sm font-semibold transition duration-300 ${
                  active
                    ? "text-green-700"
                    : "text-gray-600 hover:text-green-700"
                }`}>
                <Icon size={17} />
                {link.name}

                {/* Active Indicator */}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-green-600 transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/events/create"
            className="inline-flex items-center gap-2 rounded-full border border-green-700 px-5 py-2.5 text-sm font-semibold text-green-800 transition duration-300 hover:-translate-y-0.5 hover:bg-green-50 hover:shadow-md">
            <PlusCircle size={17} />
            Create Event
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-green-700 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-md">
            Login
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-green-100 hover:text-green-700 md:hidden">
          {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        className={`overflow-hidden border-t border-green-100 bg-white transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}>
        <div className="space-y-2 px-5 py-5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition duration-200 ${
                  active
                    ? "bg-green-100 text-green-800"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                }`}>
                <Icon size={19} />
                {link.name}
              </Link>
            );
          })}

          <div className="grid grid-cols-2 gap-3 border-t border-green-100 pt-4">
            <Link
              href="/events/create"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 rounded-lg border border-green-700 px-3 py-3 text-sm font-semibold text-green-800 transition hover:bg-green-50">
              <PlusCircle size={17} />
              Create Event
            </Link>

            <Link
              href="/login"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 rounded-lg bg-green-700 px-3 py-3 text-sm font-semibold text-white transition hover:bg-green-800">
              Sign In
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
