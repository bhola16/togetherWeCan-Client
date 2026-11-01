"use client";

import ManageMyEventCard from "@/components/ManageMyEventCard";
import { authClient } from "@/lib/auth-client";
import { IEvent } from "@/type/Type";
import { Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const API_URL = (
  process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

// Convert event date to timestamp for sorting.
const getEventTimestamp = (date: string | undefined) => {
  if (!date) return Number.MAX_SAFE_INTEGER;

  const timestamp = new Date(`${date.slice(0, 10)}T00:00:00`).getTime();

  return Number.isNaN(timestamp) ? Number.MAX_SAFE_INTEGER : timestamp;
};

// Sort events by date (earliest first).
const sortEventsByDate = (events: IEvent[]) => {
  return [...events].sort(
    (a, b) => getEventTimestamp(a.eventDate) - getEventTimestamp(b.eventDate),
  );
};

const ManageMyEvents = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [events, setEvents] = useState<IEvent[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch events created by the logged-in user.
  useEffect(() => {
    if (isPending) return;

    if (!user?.email) {
      setEvents([]);
      return;
    }

    let cancelled = false;

    const fetchMyEvents = async () => {
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
            event.organizerEmail?.toLowerCase() === user.email.toLowerCase(),
        );

        // Sort events by event date.
        const sortedEvents = sortEventsByDate(myEvents);

        if (!cancelled) {
          setEvents(sortedEvents);
        }
      } catch (error) {
        console.error("Fetch my events error:", error);

        if (!cancelled) {
          toast.error("Unable to load your events.");
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

  // Update event and maintain date sorting.
  const handleUpdateEvent = (updatedEvent: IEvent) => {
    setEvents((previousEvents) => {
      const updatedEvents = previousEvents.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event,
      );

      return sortEventsByDate(updatedEvents);
    });
  };

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
            Manage the events you have created. You can view, edit, or delete
            your events whenever you need.
          </p>
        </div>

        {/* Event Count */}
        <div className="mb-8 flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/30">
          <Users className="text-green-600" size={24} />

          <p className="font-medium text-gray-700 dark:text-gray-300">
            You have created{" "}
            <span className="font-bold text-green-700 dark:text-green-400">
              {events.length}
            </span>{" "}
            {events.length === 1 ? "event" : "events"}.
          </p>
        </div>

        {/* Empty State */}
        {events.length === 0 ? (
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
            </Link>
          </div>
        ) : (
          /* My Events Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <ManageMyEventCard
                key={event._id}
                event={event}
                onDelete={handleDeleteEvent}
                deletingId={deletingId}
                onUpdated={handleUpdateEvent}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ManageMyEvents;
