"use client";

import { ArrowRight, HeartHandshake, Mail } from "lucide-react";

const Subscribe = () => {
  return (
    <section className="bg-[#F8FAF7] px-6 py-16 transition-colors duration-300 dark:bg-gray-950 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-800 via-green-800 to-emerald-900 px-6 py-12 text-center shadow-xl sm:px-12 md:py-16 dark:from-gray-900 dark:via-green-950 dark:to-gray-950">
          {/* Background Decoration */}
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-green-700/50 blur-2xl dark:bg-green-600/20" />
          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-green-600/30 blur-2xl dark:bg-emerald-500/20" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
              <HeartHandshake size={30} />
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Stay Connected. Make an Impact.
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-green-100 dark:text-green-200">
              Subscribe to our newsletter and stay updated with upcoming events,
              volunteer opportunities, and inspiring community stories.
            </p>

            {/* Subscribe Form - Static UI */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-2xl border border-transparent bg-white p-2 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 sm:flex-row">
              <div className="flex flex-1 items-center gap-3 px-3">
                <Mail
                  size={20}
                  className="shrink-0 text-green-700 dark:text-green-400"
                />

                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-transparent py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-bold text-white transition-colors hover:bg-green-900 dark:bg-green-600 dark:hover:bg-green-500">
                Subscribe
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            <p className="mt-5 text-xs text-green-200 dark:text-gray-400">
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
