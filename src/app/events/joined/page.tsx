"use client";

import JoinedCard from "@/components/JoinedCard";
import { authClient } from "@/lib/auth-client";
import { JoinedEvent } from "@/type/Type";
import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const API_URL = (
  process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

const JoinedPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [joinedEvents, setJoinedEvents] = useState<JoinedEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    if (!user) {
      setJoinedEvents([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchJoinedEvents = async () => {
      setLoading(true);

      try {
        const res = await fetch(`${API_URL}/myjoinedevents/${user.id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch joined events.");
        }

        const data: JoinedEvent[] = await res.json();

        // Sort using the latest event date from the event document.
        // Events without a valid date appear at the end.
        const sortedEvents = [...data].sort((a, b) => {
          const dateA = a.event?.eventDate
            ? new Date(a.event.eventDate).getTime()
            : Number.MAX_SAFE_INTEGER;

          const dateB = b.event?.eventDate
            ? new Date(b.event.eventDate).getTime()
            : Number.MAX_SAFE_INTEGER;

          const safeDateA = Number.isNaN(dateA)
            ? Number.MAX_SAFE_INTEGER
            : dateA;

          const safeDateB = Number.isNaN(dateB)
            ? Number.MAX_SAFE_INTEGER
            : dateB;

          return safeDateA - safeDateB;
        });

        if (!cancelled) {
          setJoinedEvents(sortedEvents);
        }
      } catch (error) {
        console.error("Fetch joined events error:", error);

        if (!cancelled) {
          toast.error("Unable to load your joined events.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchJoinedEvents();

    return () => {
      cancelled = true;
    };
  }, [user?.id, isPending]);

  if (isPending) {
    return null;
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <Users size={48} className="mb-4 text-green-600" />

        <h2 className="text-2xl font-bold">Please Login</h2>

        <p className="mt-2 text-gray-500">
          Log in to see the events you have joined.
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
            My Joined Events
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            Keep track of the community events you have joined and continue
            making a positive difference.
          </p>
        </div>

        {/* Event Count */}
        <div className="mb-8 flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/30">
          <Users className="text-green-600" size={24} />

          <p className="font-medium text-gray-700 dark:text-gray-300">
            You have joined{" "}
            <span className="font-bold text-green-700 dark:text-green-400">
              {joinedEvents.length}
            </span>{" "}
            {joinedEvents.length === 1 ? "event" : "events"}.
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
        ) : joinedEvents.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-900">
            <Users size={48} className="mx-auto mb-4 text-gray-400" />

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              No Joined Events Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              You haven&apos;t joined any events yet. Explore upcoming events
              and become part of something meaningful.
            </p>

            <Link
              href="/events"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700">
              Explore Events
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          /* Joined Events Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {joinedEvents.map((joinedEvent) => (
              <JoinedCard key={joinedEvent._id} joinedEvent={joinedEvent} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default JoinedPage;
