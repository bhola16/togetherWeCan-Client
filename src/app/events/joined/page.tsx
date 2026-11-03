"use client";

import JoinedCard from "@/components/shared/JoinedCard";
import RetryButton from "@/components/shared/RetryButton";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenClient";
import { JoinedEvent } from "@/type/Type";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  History,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const API_URL = (
  process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

const JoinedPage = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [joinedEvents, setJoinedEvents] = useState<JoinedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (isPending) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    let cancelled = false;

    const fetchJoinedEvents = async () => {
      setLoading(true);
      setError(false);

      try {
        // Get JWT token.
        const { token, error } = await getTokenFromClient();

        if (error || !token) {
          if (!cancelled) {
            router.replace("/login");
          }
          return;
        }

        const url = `${API_URL}/myjoinedevents/${user.id}`;

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        // Handle authentication failure.
        if (res.status === 401 || res.status === 403) {
          if (!cancelled) {
            router.replace("/login");
          }
          return;
        }

        if (!res.ok) {
          throw new Error(`Failed to fetch joined events: ${res.status}`);
        }

        const result: JoinedEvent[] = await res.json();

        const availableEvents = result.filter((joinedEvent) =>
          Boolean(joinedEvent.event),
        );

        if (!cancelled) {
          setJoinedEvents(availableEvents);
        }
      } catch {
        if (!cancelled) {
          setError(true);
          toast.error(
            "Unable to connect to the server. Please try again later.",
          );
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
  }, [user?.id, isPending, router, retry]);

  // Get the latest event date from the event document.
  const getEventDate = (joinedEvent: JoinedEvent) => {
    const dateString = joinedEvent.event?.eventDate || joinedEvent.eventDate;

    if (!dateString) return null;

    const date = new Date(`${dateString.slice(0, 10)}T00:00:00`);

    return Number.isNaN(date.getTime()) ? null : date;
  };

  // Separate upcoming and previous events.
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = joinedEvents
    .filter((joinedEvent) => {
      const eventDate = getEventDate(joinedEvent);
      return eventDate !== null && eventDate >= today;
    })
    .sort((a, b) => getEventDate(a)!.getTime() - getEventDate(b)!.getTime());

  const previousEvents = joinedEvents
    .filter((joinedEvent) => {
      const eventDate = getEventDate(joinedEvent);
      return eventDate === null || eventDate < today;
    })
    .sort((a, b) => {
      const dateA = getEventDate(a)?.getTime() ?? Number.MIN_SAFE_INTEGER;
      const dateB = getEventDate(b)?.getTime() ?? Number.MIN_SAFE_INTEGER;

      return dateB - dateA;
    });

  if (isPending || !user) {
    return null;
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
        <div className="mb-10 flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/30">
          <Users className="text-green-600" size={24} />

          <p className="font-medium text-gray-700 dark:text-gray-300">
            You have joined{" "}
            <span className="font-bold text-green-700 dark:text-green-400">
              {joinedEvents.length}
            </span>
            {joinedEvents.length === 1 ? " event" : " events"}.
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
        ) : error ? (
          /* API Error State */
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-900">
            <AlertCircle size={48} className="mx-auto mb-4 text-gray-400" />

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Unable to Load Joined Events
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500 dark:text-gray-400">
              We couldn't connect to the server or retrieve your joined events.
              Please try again later.
            </p>

            <RetryButton />
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
          <div className="space-y-16">
            {/* Upcoming Joined Events */}
            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-green-100 p-3 dark:bg-green-950">
                  <CalendarDays className="text-green-600" size={24} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Upcoming Joined Events
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Events you are going to participate in.
                  </p>
                </div>

                <span className="ml-auto rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-950 dark:text-green-400">
                  {upcomingEvents.length}
                </span>
              </div>

              {upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {upcomingEvents.map((joinedEvent) => (
                    <JoinedCard
                      key={joinedEvent._id}
                      joinedEvent={joinedEvent}
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
                    No upcoming joined events.
                  </p>

                  <Link
                    href="/events"
                    className="mt-3 inline-flex items-center gap-2 font-semibold text-green-600 hover:text-green-700">
                    Explore Events
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </section>

            {/* My Previous Events */}
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
                    My Previous Events
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Events you have joined in the past.
                  </p>
                </div>

                <span className="ml-auto rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {previousEvents.length}
                </span>
              </div>

              {previousEvents.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {previousEvents.map((joinedEvent) => (
                    <JoinedCard
                      key={joinedEvent._id}
                      joinedEvent={joinedEvent}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center dark:border-gray-700 dark:bg-gray-900">
                  <History size={36} className="mx-auto mb-3 text-gray-400" />

                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    No previous events yet.
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

export default JoinedPage;
