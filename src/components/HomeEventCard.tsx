import { Card } from "@/components/ui/card";
import { IPastEvent } from "@/type/Type";
import { ArrowRight, CalendarDays, CheckCircle2, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HomeEventCardProps {
  event: IPastEvent;
  status: "upcoming" | "completed";
}

const HomeEventCard = ({ event, status }: HomeEventCardProps) => {
  const formatDate = (date: string) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(`${date.slice(0, 10)}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-0 shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-900/15 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-emerald-800">
      <Link
        href={`/events/${event._id}`}
        aria-label={`View ${event.title}`}
        className="relative block h-72 shrink-0 overflow-hidden bg-gray-200 dark:bg-gray-800">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10 transition-all duration-500 group-hover:from-black/95" />

        <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-2">
          <span className="max-w-[60%] truncate rounded-full border border-white/30 bg-white/90 px-3.5 py-2 text-xs font-bold text-gray-800 shadow-lg backdrop-blur-md">
            {event.eventType}
          </span>

          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-300/30 bg-emerald-600/95 px-3.5 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
            {status === "completed" ? (
              <CheckCircle2 size={14} />
            ) : (
              <Clock size={14} />
            )}
            {status === "completed" ? "Completed" : "Upcoming"}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <h3 className="line-clamp-2 text-2xl font-extrabold leading-snug text-emerald-300">
            {event.title}
          </h3>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-gray-200">
            <span className="flex items-center gap-2">
              <CalendarDays size={15} className="text-emerald-300" />
              {formatDate(event.eventDate)}
            </span>

            <span className="flex min-w-0 items-center gap-2">
              <span className="h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
              <span className="truncate">{event.location}</span>
            </span>
          </div>
        </div>

        <div className="absolute bottom-5 right-5 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full border border-white/30 bg-white text-emerald-700 opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowRight size={20} />
        </div>
      </Link>
    </Card>
  );
};

export default HomeEventCard;
