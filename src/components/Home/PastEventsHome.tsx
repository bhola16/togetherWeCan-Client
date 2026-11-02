"use client";

import { IPastEvent } from "@/type/Type";
import { Archive, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import HomeEventCard from "../shared/HomeEventCard";

const API_URL = (
  process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

const PastEventsHome = () => {
  const [pastEvents, setPastEvents] = useState<IPastEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        const now = new Date();

        const today = [
          now.getFullYear(),
          String(now.getMonth() + 1).padStart(2, "0"),
          String(now.getDate()).padStart(2, "0"),
        ].join("-");

        const res = await fetch(`${API_URL}/pastevents-home?today=${today}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const data: IPastEvent[] = await res.json();

        setPastEvents(data);
      } catch (error) {
        console.error("Fetch past events error:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchPastEvents();
  }, []);

  return (
    <section className="overflow-hidden bg-[#F7FAF7] px-5 py-16 dark:bg-gray-950 sm:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Sparkles size={15} />
              Our Community Memories
            </div>

            <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Completed Events
              <span className="text-emerald-600">.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
              Every small action creates a ripple of change. Explore the moments
              when our community came together to make a difference.
            </p>
          </div>

          <Link
            href="/pastevents"
            className="group inline-flex w-fit items-center gap-3 rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-xl hover:shadow-emerald-700/30 active:scale-95 dark:bg-emerald-600 dark:hover:bg-emerald-700">
            Explore All Events
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </Link>
        </div>

        {/* Events Grid */}
        <div>
          {loading ? (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse overflow-hidden rounded-3xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
                  <div className="h-64 bg-gray-200 dark:bg-gray-800" />

                  <div className="space-y-4 p-5">
                    <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="h-10 w-full rounded bg-gray-200 dark:bg-gray-800" />
                  </div>
                </div>
              ))}
            </div>
          ) : pastEvents.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-900">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                <Archive size={30} />
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                No Past Events Yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
                Our completed community events will appear here. Stay tuned for
                the amazing things we accomplish together!
              </p>

              <Link
                href="/pastevents"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-800 hover:shadow-lg active:scale-95">
                Explore Completed Events
                <ArrowRight size={17} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event) => (
                <HomeEventCard
                  key={event._id}
                  event={event}
                  status="completed"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PastEventsHome;
