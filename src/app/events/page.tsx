import { CalendarDays, Leaf } from "lucide-react";

import { IEvent } from "@/type/Type";
import EventsCard from "@/components/EventsCard";

const AllEventsPage = async () => {
  const res = await fetch("http://localhost:8000/events", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const events: IEvent[] = await res.json();

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50/70 via-white to-gray-50 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm">
            <Leaf size={16} />
            TogetherWeCan Community
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Upcoming <span className="text-green-700">Events</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            Discover meaningful events, connect with passionate people, and take
            small steps toward creating a greater impact.
          </p>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-green-600" />
        </div>

        {/* Event Count */}
        {events.length > 0 && (
          <div className="mb-6 text-center">
            <p className="text-md font-medium text-gray-500">
              <span className="font-bold text-green-700">{events.length}</span>{" "}
              {events.length === 1 ? "event" : "events"} bringing people
              together for a better tomorrow.
            </p>
          </div>
        )}

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-green-200 bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-green-50">
              <CalendarDays size={38} className="text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              No Events Found
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
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
