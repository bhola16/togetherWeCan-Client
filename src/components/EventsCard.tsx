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

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { IEvent } from "@/type/Type";

interface EventsCardProps {
  events: IEvent[];
}

const EventsCard = ({ events }: EventsCardProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card
          key={event._id}
          className="group overflow-hidden rounded-2xl border border-gray-100 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-teal-700">
          {/* Event Image */}
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Image Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Event Category */}
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50/95 px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur-md dark:border-emerald-800 dark:bg-gray-900/90 dark:text-emerald-300">
              <Tag size={12} />
              {event.eventType}
            </span>

            {/* Event Date */}
            <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white">
              <CalendarDays size={17} />
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

          {/* Card Header */}
          <CardHeader className="px-4 pb-2 pt-4">
            <CardTitle className="line-clamp-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
              {event.title}
            </CardTitle>
          </CardHeader>

          {/* Card Content */}
          <CardContent className="space-y-4 px-4 pb-4">
            {/* Event Information Panel */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-3 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-800/70">
              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400">
                  <MapPin size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    Location
                  </p>
                  <p className="truncate text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {event.location}
                  </p>
                </div>
              </div>

              <div className="my-3 border-t border-gray-200 dark:border-gray-700" />

              {/* Organizer */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                  <Users size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    Organized By
                  </p>
                  <p className="truncate text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {event.organizerEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div>
              <div className="mb-1.5 flex items-center gap-2">
                <AlignLeft
                  size={15}
                  className="text-amber-600 dark:text-amber-400"
                />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  About Event
                </span>
              </div>

              <p className="line-clamp-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                {event.description}
              </p>
            </div>
          </CardContent>

          {/* Card Footer */}
          <CardFooter className="flex items-center justify-center gap-4 border-t border-teal-800 bg-teal-700 px-4 py-3 transition-colors duration-300 group-hover:bg-teal-800 dark:border-teal-700 dark:bg-teal-900 dark:group-hover:bg-teal-800">
            <Link
              href={`/events/${event._id}`}
              className="text-base font-semibold text-white transition-colors hover:text-amber-300">
              View Event
            </Link>

            <Link
              href={`/events/${event._id}`}
              aria-label={`View ${event.title}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-teal-700 transition-all duration-300 hover:rotate-45 hover:bg-amber-300 hover:text-teal-900">
              <ArrowUpRight size={18} />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default EventsCard;
