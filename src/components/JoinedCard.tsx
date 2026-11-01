"use client";

import { IEvent, JoinedEvent } from "@/type/Type";
import { ArrowUpRight, CalendarDays, CheckCircle2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardFooter } from "./ui/card";

const formatDate = (date: string) => {
  if (!date) return "Date not available";

  const parsedDate = new Date(`${date.slice(0, 10)}T00:00:00Z`);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date not available";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
};

const formatJoinedDate = (date: string | null) => {
  if (!date) return "Date not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date not available";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const JoinedCard = ({ joinedEvent }: { joinedEvent: JoinedEvent }) => {
  const event: IEvent | null = joinedEvent.event;

  if (!event) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200">
          {joinedEvent.eventTitle || "Event unavailable"}
        </h2>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          This event may have been deleted or is no longer available.
        </p>
      </div>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-emerald-900">
      {/* Image Section */}
      <div className="relative h-48 shrink-0 overflow-hidden sm:h-52">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />

        {/* Event Type */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur-md">
            {event.eventType}
          </span>
        </div>

        {/* Joined Status */}
        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md">
          <CheckCircle2 size={14} />
          Joined
        </div>

        {/* Image Bottom Content */}
        <div className="absolute bottom-4 left-5 right-5">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-300">
            Community Event
          </p>

          <h2 className="line-clamp-2 text-xl font-bold leading-snug text-white">
            {event.title}
          </h2>
        </div>
      </div>

      {/* Information Section */}
      <Card className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Description */}
        <div className="mb-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
            About Event
          </p>

          <p className="line-clamp-2 text-sm leading-5 text-gray-600 dark:text-gray-400">
            {event.description}
          </p>
        </div>

        {/* Event Details */}
        <div className="space-y-2">
          {/* Event Date */}
          <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-2 dark:border-gray-800">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50">
              <CalendarDays size={16} />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-medium text-gray-400">
                Event Date
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {formatDate(event.eventDate)}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-2 dark:border-gray-800">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50">
              <MapPin size={16} />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-medium text-gray-400">Location</p>
              <p className="line-clamp-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
                {event.location}
              </p>
            </div>
          </div>

          {/* Joined Date */}
          <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-2 dark:border-gray-800">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50">
              <CheckCircle2 size={16} />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-medium text-gray-400">Joined On</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {formatJoinedDate(joinedEvent.joinedAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Footer - Unchanged */}
        <CardFooter className="-mx-5 mt-1 flex items-center justify-center gap-2 border-t border-gray-100 bg-gray-50 px-4 py-2 transition-colors duration-300 hover:bg-emerald-50 dark:border-gray-800 dark:bg-gray-800/50 dark:hover:bg-emerald-950/30">
          <Link
            href={`/events/${event._id}`}
            className="text-sm font-bold text-emerald-700 transition-all duration-300 hover:tracking-wide hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300">
            View Event
          </Link>

          <Link
            href={`/events/${event._id}`}
            aria-label={`View ${event.title}`}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm transition-all duration-300 hover:rotate-45 hover:scale-110 hover:bg-emerald-700 hover:shadow-md hover:shadow-emerald-600/30 active:scale-95">
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300"
            />
          </Link>
        </CardFooter>
      </Card>
    </article>
  );
};

export default JoinedCard;
