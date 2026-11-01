import EventsFilter from "@/components/EventsFilter";
import { IEvent } from "@/type/Type";
import { CalendarDays, Leaf, Plus } from "lucide-react";
import Link from "next/link";

const API_URL = (
  process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

const AllEventsPage = async () => {
  const res = await fetch(`${API_URL}/events`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const allEvents: IEvent[] = await res.json();

  // Get today's date at midnight (local time).
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Show only today's and future events.
  const events = allEvents.filter((event) => {
    if (!event.eventDate) return false;

    const eventDate = new Date(`${event.eventDate}T00:00:00`);

    return !Number.isNaN(eventDate.getTime()) && eventDate >= today;
  });

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50/70 via-white to-gray-50 px-4 py-14 transition-colors duration-300 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-12">
          {/* Community Badge */}
          <div className="mb-5 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm dark:border-green-800 dark:bg-gray-900 dark:text-green-400">
              <Leaf size={16} />
              TogetherWeCan Community
            </div>
          </div>

          {/* Heading and Create Event Button */}
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Upcoming
              <span className="text-green-700 dark:text-green-400">
                {" "}
                Events
              </span>
            </h1>

            <Link
              href="/events/create"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white shadow-md shadow-green-700/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-lg dark:bg-green-600 dark:hover:bg-green-500">
              <Plus size={18} />
              Create an Event
            </Link>
          </div>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
            Discover meaningful events, connect with passionate people, and take
            small steps toward creating a greater impact.
          </p>

          {/* Divider */}
          <div className="mt-8 h-px w-full bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Events Filter and Cards */}
        {events.length > 0 ? (
          <EventsFilter events={events} />
        ) : (
          <div className="rounded-3xl border border-dashed border-green-200 bg-white px-6 py-20 text-center shadow-sm transition-colors duration-300 dark:border-green-900 dark:bg-gray-900">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-green-50 dark:bg-green-900/30">
              <CalendarDays
                size={38}
                className="text-green-600 dark:text-green-400"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              No Upcoming Events
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
              There are no upcoming events right now. Check back soon for new
              opportunities to make a positive impact.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllEventsPage;
