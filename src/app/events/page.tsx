import { CalendarDays, Leaf } from "lucide-react";

import EventsCard from "@/components/EventsCard";
import { IEvent } from "@/type/Type";

const AllEventsPage = async () => {
  const res = await fetch("http://localhost:8000/events", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const events: IEvent[] = await res.json();

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50/70 via-white to-gray-50 px-4 py-14 transition-colors duration-300 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm dark:border-green-800 dark:bg-gray-900 dark:text-green-400">
            <Leaf size={16} />
            TogetherWeCan Community
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Upcoming{" "}
            <span className="text-green-700 dark:text-green-400">Events</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
            Discover meaningful events, connect with passionate people, and take
            small steps toward creating a greater impact.
          </p>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-green-600 dark:bg-green-500" />
        </div>

        {/* Event Count */}
        {events.length > 0 && (
          <div className="mb-6 text-center">
            <p className="text-md font-medium text-gray-500 dark:text-gray-400">
              <span className="font-bold text-green-700 dark:text-green-400">
                {events.length}
              </span>{" "}
              {events.length === 1 ? "event" : "events"} bringing people
              together for a better tomorrow.
            </p>
          </div>
        )}

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-green-200 bg-white px-6 py-20 text-center shadow-sm transition-colors duration-300 dark:border-green-900 dark:bg-gray-900">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-green-50 dark:bg-green-900/30">
              <CalendarDays
                size={38}
                className="text-green-600 dark:text-green-400"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              No Events Found
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
              There are no events available right now. Check back soon for new
              opportunities to make a positive impact.
            </p>
          </div>
        ) : (
          <EventsCard events={events} />
        )}
      </div>
    </section>
  );
};

export default AllEventsPage;
