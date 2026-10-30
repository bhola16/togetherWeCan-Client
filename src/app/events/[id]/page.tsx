import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Tag,
  Users,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import { IEvent } from "@/type/Type";

interface EventDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const EventDetailsPage = async ({ params }: EventDetailsPageProps) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/events/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch event details");
  }

  const event: IEvent = await res.json();

  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50/70 via-white to-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Back Button */}
        <Link
          href="/upcomingevents"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-5 py-2.5 text-sm font-semibold text-green-700 shadow-sm transition-all hover:bg-green-700 hover:text-white">
          <ArrowLeft size={17} />
          Back to Events
        </Link>

        {/* Event Details Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg">
          {/* Event Image */}
          <div className="relative h-64 w-full sm:h-96">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Category Badge */}
            <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-md backdrop-blur-md">
              <Tag size={15} />
              {event.eventType}
            </div>

            {/* Event Title and Date */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl font-extrabold text-white drop-shadow-md sm:text-4xl lg:text-5xl">
                {event.title}
              </h1>

              <div className="mt-3 flex items-center gap-2 text-white">
                <CalendarDays size={18} />
                <span className="text-sm font-medium sm:text-base">
                  {formattedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Event Information */}
          <div className="grid grid-cols-1 gap-4 border-b border-gray-100 bg-gray-50/70 p-6 sm:grid-cols-3">
            {/* Location */}
            <div className="flex items-center gap-3 rounded-xl border border-teal-100 bg-white p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                <MapPin size={21} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Location
                </p>
                <p className="truncate text-sm font-semibold text-gray-800">
                  {event.location}
                </p>
              </div>
            </div>

            {/* Organizer */}
            <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Users size={21} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Organized By
                </p>
                <p className="truncate text-sm font-semibold text-gray-800">
                  {event.organizerEmail}
                </p>
              </div>
            </div>

            {/* Event Date */}
            <div className="flex items-center gap-3 rounded-xl border border-amber-100 bg-white p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <CalendarDays size={21} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Event Date
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>

          {/* Event Description */}
          <div className="p-6 sm:p-8">
            <div className="mb-5">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-teal-700">
                <HeartHandshake size={18} />
                Event Overview
              </div>

              <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                Discover What This Event Is About
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Learn more about the event, its purpose, and how you can be part
                of it.
              </p>
            </div>

            <p className="whitespace-pre-line text-base leading-8 text-gray-600">
              {event.description}
            </p>

            {/* Bottom Section */}
            <div className="mt-10 overflow-hidden rounded-2xl bg-teal-700 p-6 text-center sm:p-8">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white">
                <HeartHandshake size={28} />
              </div>

              <h3 className="mt-4 text-xl font-bold text-white sm:text-2xl">
                Be Part of the Change!
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-teal-50">
                Every event is an opportunity to connect, contribute, and make a
                positive difference. Explore our community events and find an
                opportunity to get involved.
              </p>

              <Link
                href="/upcomingevents"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-teal-800 shadow-md transition-all hover:bg-amber-100 hover:text-teal-900">
                Explore More Events
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
