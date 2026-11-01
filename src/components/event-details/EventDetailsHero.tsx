import { IEvent } from "@/type/Type";
import { ArrowLeft, CalendarDays, MapPin, Sparkles, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EventDetailsHeroProps {
  event: IEvent;
  formattedDate: string;
  isUpcoming: boolean;
  statusText: string;
}

const EventDetailsHero = ({
  event,
  formattedDate,
  isUpcoming,
  statusText,
}: EventDetailsHeroProps) => {
  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/events"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-teal-700 dark:text-gray-400 dark:hover:text-teal-400">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white transition group-hover:border-teal-200 group-hover:bg-teal-50 dark:border-gray-700 dark:bg-gray-900 dark:group-hover:border-teal-700 dark:group-hover:bg-gray-800">
            <ArrowLeft size={17} />
          </span>
          Back to All Events
        </Link>

        <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white px-4 py-2 text-xs font-bold tracking-wide text-teal-800 shadow-sm dark:border-teal-900 dark:bg-gray-900 dark:text-teal-300">
          <Sparkles size={15} className="text-emerald-500" />
          TogetherWeCan Community
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden rounded-[2rem] bg-gray-950 shadow-xl">
        <div className="relative h-[440px] sm:h-[500px] lg:h-[570px]">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/30 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                <Tag size={14} />
                {event.eventType}
              </span>

              <span
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold backdrop-blur-md ${
                  isUpcoming
                    ? "border-white/20 bg-white/15 text-white"
                    : "border-gray-400/30 bg-gray-700/70 text-gray-100"
                }`}>
                <span
                  className={`h-2 w-2 rounded-full ${
                    isUpcoming ? "bg-emerald-400" : "bg-gray-300"
                  }`}
                />
                {statusText}
              </span>
            </div>

            <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-6xl">
              {event.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4 text-sm font-medium text-gray-100">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-emerald-300 backdrop-blur-sm">
                  <CalendarDays size={18} />
                </span>
                {formattedDate}
              </div>

              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-emerald-300 backdrop-blur-sm">
                  <MapPin size={18} />
                </span>
                <span className="max-w-[260px]">{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventDetailsHero;
