import {
  AlignLeft,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Tag,
  Users,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { IEvent } from "@/type/Type";

interface EventsCardProps {
  events: IEvent[];
}

const EventsCard = ({ events }: EventsCardProps) => {
  return (
    <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card
          key={event._id}
          className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-0 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/10 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-emerald-700">
          {/* Event Image */}
          <div className="relative h-52 w-full shrink-0 overflow-hidden">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Image Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-colors duration-500 group-hover:from-black/90" />

            {/* Event Category */}
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/90 px-2.5 py-1 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:border-emerald-300 group-hover:bg-emerald-50 dark:bg-gray-900/90 dark:text-emerald-300 dark:group-hover:bg-emerald-950">
              <Tag
                size={12}
                className="transition-transform duration-300 group-hover:rotate-12"
              />
              {event.eventType}
            </span>

            {/* Event Title and Date */}
            <div className="absolute bottom-3 left-3 right-3">
              <h2 className="mb-1.5 line-clamp-2 text-lg font-bold leading-snug text-white drop-shadow-md transition-transform duration-300 group-hover:-translate-y-0.5">
                {event.title}
              </h2>

              <div className="flex items-center gap-2 text-white">
                <CalendarDays size={15} className="shrink-0 text-emerald-300" />
                <span className="text-sm font-semibold">
                  {new Date(event.eventDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <CardContent className="flex flex-1 flex-col gap-2.5 px-3.5 py-1">
            {/* Event Information Panel */}
            <div className="rounded-lg border border-gray-100 bg-gray-50/80 p-2 transition-colors duration-300 hover:border-emerald-200 hover:bg-emerald-50/50 dark:border-gray-800 dark:bg-gray-800/70 dark:hover:border-emerald-900 dark:hover:bg-emerald-950/20">
              {/* Location */}
              <div className="group/info flex items-center gap-2 rounded-md p-1 transition-colors duration-300 hover:bg-white dark:hover:bg-gray-700/60">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-700 transition-all duration-300 group-hover/info:scale-110 group-hover/info:bg-teal-200 dark:bg-teal-900/40 dark:text-teal-400 dark:group-hover/info:bg-teal-900">
                  <MapPin size={15} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    Location
                  </p>
                  <p className="truncate text-sm font-semibold text-gray-700 transition-colors group-hover/info:text-teal-700 dark:text-gray-200 dark:group-hover/info:text-teal-400">
                    {event.location}
                  </p>
                </div>
              </div>

              <div className="my-1.5 border-t border-gray-200 dark:border-gray-700" />

              {/* Organizer */}
              <div className="group/info mt-0.5 flex items-center gap-2 rounded-md p-1 transition-colors duration-300 hover:bg-white dark:hover:bg-gray-700/60">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 transition-all duration-300 group-hover/info:scale-110 group-hover/info:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:group-hover/info:bg-emerald-900">
                  <Users size={15} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    Organized By
                  </p>
                  <p className="truncate text-sm font-semibold text-gray-700 transition-colors group-hover/info:text-emerald-700 dark:text-gray-200 dark:group-hover/info:text-emerald-400">
                    {event.organizerEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div className="rounded-lg border border-gray-100 bg-gray-50/70 p-2.5 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50/70 hover:shadow-sm dark:border-gray-800 dark:bg-gray-800/40 dark:hover:border-emerald-900 dark:hover:bg-emerald-950/20">
              <div className="mb-1.5 flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 transition-transform duration-300 hover:rotate-6 dark:bg-emerald-900/40 dark:text-emerald-400">
                  <AlignLeft size={13} />
                </div>

                <span className="text-sm font-bold tracking-wide text-gray-700 dark:text-gray-200">
                  About This Event
                </span>
              </div>

              <p className="line-clamp-2 text-sm leading-5 text-gray-500 dark:text-gray-400">
                {event.description}
              </p>
            </div>
          </CardContent>

          {/* Card Footer */}
          <CardFooter className="mt-1 flex items-center justify-center gap-2 border-t border-gray-100 bg-gray-50 px-4 py-2 transition-colors duration-300 hover:bg-emerald-50 dark:border-gray-800 dark:bg-gray-800/50 dark:hover:bg-emerald-950/30">
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
      ))}
    </div>
  );
};

export default EventsCard;
