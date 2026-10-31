"use client";

import { IEvent } from "@/type/Type";
import { ArrowUpRight, CalendarDays, CheckCircle2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface JoinedEvent {
  _id: string;
  eventId: string;
  eventTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  joinedAt: string;
}

const API_URL = (
  process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

const JoinedCard = ({ joinedEvent }: { joinedEvent: JoinedEvent }) => {
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchEvent = async () => {
      try {
        const res = await fetch(`${API_URL}/events/${joinedEvent.eventId}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch event.");
        }

        const data: IEvent = await res.json();

        if (!cancelled) {
          setEvent(data);
        }
      } catch (error) {
        console.error("Fetch event error:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchEvent();

    return () => {
      cancelled = true;
    };
  }, [joinedEvent.eventId]);

  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="h-56 animate-pulse bg-gray-200 dark:bg-gray-800" />
        <div className="space-y-4 p-5">
          <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    );
  }

  if (!event) return null;

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

        {/* Event Type */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur-md">
            {event.eventType}
          </span>
        </div>

        {/* Joined Status */}
        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-green-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md">
          <CheckCircle2 size={14} />
          Joined
        </div>

        {/* Image Bottom Content */}
        <div className="absolute bottom-4 left-5 right-5">
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-green-300">
            Community Event
          </p>

          <h2 className="line-clamp-2 text-xl font-bold text-white">
            {event.title}
          </h2>
        </div>
      </div>

      {/* Information Section */}
      <div className="p-5">
        <p className="mb-5 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-950/50">
              <CalendarDays size={18} />
            </div>

            <div>
              <p className="text-xs text-gray-400">Event Date</p>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {new Date(event.eventDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-950/50">
              <MapPin size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-gray-400">Location</p>
              <p className="line-clamp-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                {event.location}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 border-t border-gray-100 pt-4 dark:border-gray-800">
          <Link
            href={`/events/${event._id}`}
            className="flex w-full items-center justify-between rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 transition-all duration-200 hover:bg-green-600 hover:text-white dark:bg-green-950/40 dark:text-green-400 dark:hover:bg-green-600 dark:hover:text-white">
            <span>View Event Details</span>

            <ArrowUpRight
              size={19}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default JoinedCard;
