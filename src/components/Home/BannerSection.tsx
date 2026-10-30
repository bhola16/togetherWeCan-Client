"use client";

import {
  ArrowRight,
  CalendarCheck,
  HandHeart,
  Heart,
  HeartHandshake,
  PlusCircle,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const statistics = [
  {
    label: "Active Volunteers",
    value: "2,500+",
    icon: Users,
    href: "/events",
    description: "Join our volunteer community",
  },
  {
    label: "Events Completed",
    value: "180+",
    icon: CalendarCheck,
    href: "/events",
    description: "Explore community events",
  },
  {
    label: "Lives Impacted",
    value: "12K+",
    icon: Heart,
    href: "/events",
    description: "Discover our community initiatives",
  },
  {
    label: "Community Driven",
    value: "100%",
    icon: HandHeart,
    href: "/events",
    description: "Be part of the change",
  },
];

const BannerSection = () => {
  return (
    <section className="overflow-hidden bg-[#F8FAF7]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Hero Section */}
        <div className="grid items-center gap-10 py-8 md:grid-cols-2 md:gap-12 md:py-12">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex cursor-default items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800 transition duration-300 hover:bg-green-200 hover:shadow-sm">
              <HeartHandshake size={17} className="animate-pulse" />
              Together, We Make a Difference
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#101A16] sm:text-5xl lg:text-6xl">
              Small Actions.
              <span className="block text-green-700 transition-colors duration-300 hover:text-green-600">
                Greater Impact.
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-xl text-base leading-8 text-gray-600 md:text-lg">
              Be part of something meaningful. Discover community events,
              connect with passionate people, and turn small acts of kindness
              into lasting change. Together, we can build a stronger and more
              caring community.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/events"
                className="group inline-flex items-center gap-2 rounded-lg bg-green-700 px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-green-800 hover:shadow-xl active:scale-95">
                Explore Upcoming Events
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/create-events"
                className="group inline-flex items-center gap-2 rounded-lg border border-green-700 px-6 py-3.5 font-semibold text-green-800 transition-all duration-300 hover:-translate-y-1 hover:bg-green-50 hover:shadow-lg active:scale-95">
                <PlusCircle
                  size={18}
                  className="transition-transform duration-300 group-hover:rotate-90"
                />
                Create an Event
              </Link>
            </div>

            {/* Community Message */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-green-200 text-sm font-bold text-green-800 transition-transform duration-300 hover:z-10 hover:-translate-y-2">
                  A
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-orange-200 text-sm font-bold text-orange-800 transition-transform duration-300 hover:z-10 hover:-translate-y-2">
                  B
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-emerald-200 text-sm font-bold text-emerald-800 transition-transform duration-300 hover:z-10 hover:-translate-y-2">
                  C
                </div>
              </div>

              <p className="text-sm text-gray-600">
                <span className="font-bold text-[#101A16]">One Community</span>
                <br />
                Working together for a better tomorrow
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative mx-auto w-full max-w-xl">
            {/* Background Decoration */}
            <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-orange-200/60 blur-2xl transition-transform duration-700 hover:scale-125" />

            <div className="absolute -bottom-5 -left-5 h-40 w-40 rounded-full bg-green-200/70 blur-2xl" />

            {/* Main Image */}
            <div className="group relative overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/assets/volunteer.webp"
                alt="Volunteers working together for their community"
                width={700}
                height={600}
                priority
                className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[400px]"
              />

              {/* Image Caption */}
              <div className="absolute bottom-5 left-5 right-5 translate-y-2 rounded-2xl border border-white/30 bg-white/90 p-4 opacity-90 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-bold text-[#101A16]">Every Action Counts.</p>

                <p className="mt-1 text-sm text-gray-600">
                  Start making a positive impact in your community today.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="pb-6 pt-2 md:pb-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {statistics.map((stat) => {
              const Icon = stat.icon;

              return (
                <Link
                  key={stat.label}
                  href={stat.href}
                  aria-label={`${stat.label}: ${stat.value}. ${stat.description}`}
                  className="group flex items-center gap-4 rounded-xl border border-green-200 bg-white/70 px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:bg-white hover:shadow-lg active:scale-[0.98]">
                  {/* Statistic Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-green-700 group-hover:text-white">
                    <Icon size={24} />
                  </div>

                  {/* Statistic Information */}
                  <div>
                    <h3 className="text-2xl font-extrabold text-[#101A16] transition-colors duration-300 group-hover:text-green-700 sm:text-3xl">
                      {stat.value}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-gray-500 transition-colors duration-300 group-hover:text-green-700 sm:text-sm">
                      {stat.label}
                    </p>
                  </div>

                  <ArrowRight
                    size={16}
                    className="ml-auto shrink-0 text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-green-700"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
