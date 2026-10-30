import React from "react";
import Link from "next/link";
import {
  CalendarDays,
  Users,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  PlusCircle,
  HandHeart,
} from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Discover Community Events",
    description:
      "Explore upcoming social development events, from tree plantations to donation drives and community cleanups.",
    color: "bg-green-100 text-green-700",
    href: "/events",
  },
  {
    icon: PlusCircle,
    title: "Create Your Own Event",
    description:
      "Have an idea to make a difference? Create and organize your own community event and invite others to participate.",
    color: "bg-orange-100 text-orange-700",
    href: "/events/create",
  },
  {
    icon: Users,
    title: "Join as a Volunteer",
    description:
      "Connect with people who share your passion. Join meaningful initiatives and contribute your time and skills.",
    color: "bg-blue-100 text-blue-700",
    href: "/events",
  },
  {
    icon: HeartHandshake,
    title: "Build Strong Communities",
    description:
      "Bring people together, encourage collaboration, and create lasting positive changes in your local community.",
    color: "bg-purple-100 text-purple-700",
    href: "/events",
  },
  {
    icon: MapPin,
    title: "Local Event Discovery",
    description:
      "Find meaningful activities and volunteering opportunities happening around your community.",
    color: "bg-rose-100 text-rose-700",
    href: "/events",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Easy Participation",
    description:
      "Enjoy a simple and secure experience with user authentication and convenient event participation.",
    color: "bg-emerald-100 text-emerald-700",
    href: "/events",
  },
];

const OurFeaturesPage = () => {
  return (
    <section className="bg-[#F8FAF7] px-6 py-8 md:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
            <HandHeart size={17} />
            What We Offer
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#101A16] sm:text-4xl lg:text-5xl">
            Everything You Need to
            <span className="block text-green-700">Make a Difference</span>
          </h2>

          <p className="mt-5 text-base leading-8 text-gray-600">
            TogetherWeCan makes it easier to discover opportunities, organize
            meaningful events, and connect with people who believe in building a
            better world.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="group relative overflow-hidden rounded-2xl border border-green-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl">
                {/* Decorative Background */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-50 opacity-0 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100" />

                <div className="relative z-10">
                  {/* Feature Icon */}
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color} transition-all duration-300 group-hover:rotate-6 group-hover:scale-110`}>
                    <Icon size={27} />
                  </div>

                  {/* Feature Content */}
                  <h3 className="text-xl font-bold text-[#101A16] transition-colors duration-300 group-hover:text-green-700">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {feature.description}
                  </p>

                  {/* Learn More */}
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-green-700">
                    Explore Feature
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-2"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        {/* <div className="mt-14 overflow-hidden rounded-3xl bg-green-800 px-6 py-10 text-center shadow-lg md:px-12 md:py-14">
          <div className="mx-auto max-w-2xl">
            <TrendingUp className="mx-auto mb-4 text-green-200" size={36} />

            <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ready to Make a Difference?
            </h3>

            <p className="mt-4 leading-7 text-green-100">
              Your small contribution can create a big impact. Join our
              community and become part of something meaningful.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <Link
                href="/events"
                className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-green-800 transition-all duration-300 hover:-translate-y-1 hover:bg-green-50 hover:shadow-lg">
                Find Events
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/events/create"
                className="inline-flex items-center gap-2 rounded-lg border border-green-300 px-6 py-3 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-green-700">
                <PlusCircle size={18} />
                Create an Event
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default OurFeaturesPage;
