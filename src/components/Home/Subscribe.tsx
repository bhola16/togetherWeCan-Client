"use client";

import { ArrowRight, Mail, HeartHandshake } from "lucide-react";
import React from "react";

const Subscribe = () => {
  return (
    <section className="bg-[#F8FAF7] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-green-800 px-6 py-12 text-center shadow-xl sm:px-12 md:py-16">
          {/* Background Decoration */}
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-green-700/50 blur-2xl" />
          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-green-600/30 blur-2xl" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
              <HeartHandshake size={30} />
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Stay Connected. Make an Impact.
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-green-100">
              Subscribe to our newsletter and stay updated with upcoming events,
              volunteer opportunities, and inspiring community stories.
            </p>

            {/* Subscribe Form - Static UI */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-2xl bg-white p-2 sm:flex-row">
              <div className="flex flex-1 items-center gap-3 px-3">
                <Mail size={20} className="shrink-0 text-green-700" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-transparent py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-bold text-white transition hover:bg-green-900">
                Subscribe
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            <p className="mt-5 text-xs text-green-200">
              No spam. Just meaningful updates and opportunities to make a
              difference.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
