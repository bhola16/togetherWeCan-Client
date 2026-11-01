"use client";

import { IPastEvent } from "@/type/Type";
import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import HomeEventCard from "../HomeEventCard";

const API_URL = (
  process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

const NextEventsHome = () => {
  const [events, setEvents] = useState<IPastEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const res = await fetch(`${API_URL}/upcomingevents`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const data: IPastEvent[] = await res.json();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = data
          .filter((event) => {
            const eventDate = new Date(
              `${event.eventDate.slice(0, 10)}T00:00:00`,
            );

            return !Number.isNaN(eventDate.getTime()) && eventDate >= today;
          })
          .sort(
            (a, b) =>
              new Date(`${a.eventDate.slice(0, 10)}T00:00:00`).getTime() -
              new Date(`${b.eventDate.slice(0, 10)}T00:00:00`).getTime(),
          )
          .slice(0, 6);

        setEvents(upcoming);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchUpcomingEvents();
  }, []);

  return (
    <section className="bg-[#F8FAF7] px-6 py-16 dark:bg-gray-950 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-3">
              <CalendarDays
                size={30}
                className="text-green-700 dark:text-green-400"
              />

              <h2 className="text-3xl font-extrabold tracking-tight text-[#101A16] dark:text-white sm:text-4xl">
                Upcoming Initiatives
              </h2>
            </div>

            <p className="text-sm font-semibold text-green-700 dark:text-green-400">
              Recent Community Events
            </p>

            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
              Explore upcoming community events and discover opportunities to
              volunteer, connect with others, and make a positive impact. More
              initiatives will be added soon!
            </p>
          </div>

          <Link
            href="/events"
            className="group inline-flex shrink-0 items-center gap-2 font-bold text-green-700 transition hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
            View All Events
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800"
              />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 px-6 py-16 text-center dark:border-gray-700">
            <CalendarDays size={36} className="mx-auto mb-4 text-green-600" />

            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              No Upcoming Events
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Stay tuned! New community initiatives will appear here soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <HomeEventCard key={event._id} event={event} status="upcoming" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NextEventsHome;
