"use client";

import { Card } from "@/components/ui/card";
import { IPastEvent } from "@/type/Type";
import {
  Archive,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";



const API_URL = (
  process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

const PastEvents = () => {
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

        const res = await fetch(`${API_URL}/pastevents?today=${today}`, {
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

  const formatDate = (date: string) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(`${date.slice(0, 10)}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

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
              Past Events<span className="text-emerald-600">.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
              Every small action creates a ripple of change. Explore the moments
              when our community came together to make a difference.
            </p>
          </div>

          <Link
            href="/events"
            className="group inline-flex w-fit items-center gap-3 rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-xl hover:shadow-emerald-700/30 active:scale-95 dark:bg-emerald-600 dark:hover:bg-emerald-700">
            Explore Events
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
                href="/events"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-800 hover:shadow-lg active:scale-95">
                Explore Upcoming Events
                <ArrowRight size={17} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event) => (
                <Card
                  key={event._id}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-0 shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-900/15 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-emerald-800">
                  <Link
                    href={`/events/${event._id}`}
                    aria-label={`View ${event.title}`}
                    className="relative block h-72 shrink-0 overflow-hidden bg-gray-200 dark:bg-gray-800">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10 transition-all duration-500 group-hover:from-black/95" />

                    <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-2">
                      <span className="max-w-[60%] truncate rounded-full border border-white/30 bg-white/90 px-3.5 py-2 text-xs font-bold text-gray-800 shadow-lg backdrop-blur-md">
                        {event.eventType}
                      </span>

                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-300/30 bg-emerald-600/95 px-3.5 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                        <CheckCircle2 size={14} />
                        Completed
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <h3 className="line-clamp-2 text-2xl font-extrabold leading-snug text-emerald-300">
                        {event.title}
                      </h3>

                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-gray-200">
                        <span className="flex items-center gap-2">
                          <CalendarDays
                            size={15}
                            className="text-emerald-300"
                          />
                          {formatDate(event.eventDate)}
                        </span>

                        <span className="flex min-w-0 items-center gap-2">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                          <span className="truncate">{event.location}</span>
                        </span>
                      </div>
                    </div>

                    <div className="absolute bottom-5 right-5 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full border border-white/30 bg-white text-emerald-700 opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowRight size={20} />
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PastEvents;
