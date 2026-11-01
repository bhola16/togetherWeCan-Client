"use client";

import ManageMyEventCard from "@/components/ManageMyEventCard";
import { authClient } from "@/lib/auth-client";
import { IEvent } from "@/type/Type";
import { ArrowRight, CalendarDays, History, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const API_URL = (
  process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

// Convert event date to a local Date object.
const getEventDate = (dateString?: string) => {
  if (!dateString) return null;

  const date = new Date(`${dateString.slice(0, 10)}T00:00:00`);

  return Number.isNaN(date.getTime()) ? null : date;
};

// Sort upcoming events: earliest first.
const sortUpcomingEvents = (events: IEvent[]) => {
  return [...events].sort((a, b) => {
    const dateA = getEventDate(a.eventDate)?.getTime() ?? Infinity;
    const dateB = getEventDate(b.eventDate)?.getTime() ?? Infinity;

    return dateA - dateB;
  });
};

// Sort completed events: most recent first.
const sortCompletedEvents = (events: IEvent[]) => {
  return [...events].sort((a, b) => {
    const dateA = getEventDate(a.eventDate)?.getTime() ?? 0;
    const dateB = getEventDate(b.eventDate)?.getTime() ?? 0;

    return dateB - dateA;
  });
};

const ManageMyEvents = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch events created by the logged-in user.
  useEffect(() => {
    if (isPending) return;

    if (!user?.email) {
      setEvents([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchMyEvents = async () => {
      setLoading(true);

      try {
        const res = await fetch(`${API_URL}/events`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch events.");
        }

        const data: IEvent[] = await res.json();

        // Filter events created by the logged-in user.
        const myEvents = data.filter(
          (event) =>
            event.organizerEmail?.toLowerCase() === user.email?.toLowerCase(),
        );

        if (!cancelled) {
          setEvents(myEvents);
        }
      } catch (error) {
        console.error("Fetch my events error:", error);

        if (!cancelled) {
          toast.error("Unable to load your events.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchMyEvents();

    return () => {
      cancelled = true;
    };
  }, [user?.email, isPending]);

  // Delete event.
  const handleDeleteEvent = async (eventId: string) => {
    setDeletingId(eventId);

    try {
      const res = await fetch(`${API_URL}/events/${eventId}`, {
        method: "DELETE",
      });

      const data: { message?: string } = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete event.");
      }

      setEvents((previousEvents) =>
        previousEvents.filter((event) => event._id !== eventId),
      );

      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error("Delete event error:", error);

      toast.error(
        error instanceof Error ? error.message : "Unable to delete event.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Update event after editing.
  const handleUpdateEvent = (updatedEvent: IEvent) => {
    setEvents((previousEvents) =>
      previousEvents.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event,
      ),
    );
  };

  // Get today's date at midnight.
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Separate upcoming and completed events.
  const upcomingEvents = sortUpcomingEvents(
    events.filter((event) => {
      const eventDate = getEventDate(event.eventDate);

      return eventDate !== null && eventDate >= today;
    }),
  );

  const completedEvents = sortCompletedEvents(
    events.filter((event) => {
      const eventDate = getEventDate(event.eventDate);

      return eventDate !== null && eventDate < today;
    }),
  );

  if (isPending) return null;

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <Users size={48} className="mb-4 text-green-600" />

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Please Login
        </h2>

        <p className="mt-2 text-gray-500">
          Log in to manage the events you have created.
        </p>

        <Link
          href="/login"
          className="mt-5 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">
          Login
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 font-semibold uppercase tracking-wider text-green-600">
            TogetherWeCan Community
          </p>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Manage My Events
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            Manage the events you have created. Track your upcoming activities
            and look back at your completed events.
          </p>
        </div>

        {/* Event Count */}
        <div className="mb-10 flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/30">
          <Users className="text-green-600" size={24} />

          <p className="font-medium text-gray-700 dark:text-gray-300">
            You have created{" "}
            <span className="font-bold text-green-700 dark:text-green-400">
              {events.length}
            </span>{" "}
            {events.length === 1 ? "event" : "events"}.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-900">
                <div className="h-56 bg-gray-200 dark:bg-gray-800" />

                <div className="space-y-4 p-5">
                  <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-900">
            <Users size={48} className="mx-auto mb-4 text-gray-400" />

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              No Events Created Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              You haven&apos;t created any events yet. Start an event and bring
              your community together.
            </p>

            <Link
              href="/events/create"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700">
              Create an Event
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Upcoming Events */}
            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-green-100 p-3 dark:bg-green-950">
                  <CalendarDays className="text-green-600" size={24} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Upcoming Events
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Events you are going to organize.
                  </p>
                </div>

                <span className="ml-auto rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-950 dark:text-green-400">
                  {upcomingEvents.length}
                </span>
              </div>

              {upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {upcomingEvents.map((event) => (
                    <ManageMyEventCard
                      key={event._id}
                      event={event}
                      onDelete={handleDeleteEvent}
                      deletingId={deletingId}
                      onUpdated={handleUpdateEvent}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center dark:border-gray-700 dark:bg-gray-900">
                  <CalendarDays
                    size={36}
                    className="mx-auto mb-3 text-gray-400"
                  />

                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    No upcoming events.
                  </p>

                  <Link
                    href="/events/create"
                    className="mt-3 inline-flex items-center gap-2 font-semibold text-green-600 hover:text-green-700">
                    Create an Event
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </section>

            {/* Completed Events */}
            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-gray-200 p-3 dark:bg-gray-800">
                  <History
                    className="text-gray-600 dark:text-gray-300"
                    size={24}
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Completed Events
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Events you have organized in the past.
                  </p>
                </div>

                <span className="ml-auto rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {completedEvents.length}
                </span>
              </div>

              {completedEvents.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {completedEvents.map((event) => (
                    <ManageMyEventCard
                      key={event._id}
                      event={event}
                      onDelete={handleDeleteEvent}
                      deletingId={deletingId}
                      onUpdated={handleUpdateEvent}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center dark:border-gray-700 dark:bg-gray-900">
                  <History size={36} className="mx-auto mb-3 text-gray-400" />

                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    No completed events yet.
                  </p>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
};

export default ManageMyEvents;
