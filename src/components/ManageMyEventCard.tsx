"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IEvent } from "@/type/Type";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EditMyEventDialog from "./EditMyEventDialog";

// Format date as 1 November 2026.
const formatDate = (date: string | undefined) => {
  if (!date) return "Date unavailable";

  const datePart = date.slice(0, 10);
  const parts = datePart.split("-");

  let parsedDate: Date;

  if (parts.length === 3) {
    const [year, month, day] = parts.map(Number);
    parsedDate = new Date(year, month - 1, day);
  } else {
    parsedDate = new Date(date);
  }

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Get event creation date from MongoDB ObjectId.
const getCreatedDate = (id: string) => {
  try {
    if (!id || id.length < 8) return "Date unavailable";

    const timestamp = parseInt(id.substring(0, 8), 16);
    const date = new Date(timestamp * 1000);

    if (Number.isNaN(date.getTime())) {
      return "Date unavailable";
    }

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "Date unavailable";
  }
};

interface ManageMyEventCardProps {
  event: IEvent;
  onDelete: (eventId: string) => void;
  deletingId: string | null;
  onUpdated: (updatedEvent: IEvent) => void;
}

const ManageMyEventCard = ({
  event,
  onDelete,
  deletingId,
  onUpdated,
}: ManageMyEventCardProps) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900">
      {/* Event Image */}
      <div className="relative h-52 w-full overflow-hidden sm:h-56">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Event Type */}
        <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/95 px-3 py-1.5 text-xs font-semibold text-green-700 shadow-sm backdrop-blur">
          {event.eventType}
        </span>

        {/* Owner Badge */}
        <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-green-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
          <CheckCircle2 size={14} />
          Created by You
        </span>

        {/* Event Title and Date */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <h2 className="min-w-0 flex-1 line-clamp-2 text-xl font-bold leading-snug text-white drop-shadow-md">
            {event.title}
          </h2>

          <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            <CalendarDays size={15} className="shrink-0" />
            <span>{formatDate(event.eventDate)}</span>
          </div>
        </div>
      </div>

      {/* Event Information */}
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-5 line-clamp-2 min-h-12 text-sm leading-6 text-gray-600 dark:text-gray-400">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-3 rounded-xl bg-gray-50 p-3.5 dark:bg-gray-800/70">
          {/* Location */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
              <MapPin size={17} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Location
              </p>
              <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
                {event.location}
              </p>
            </div>
          </div>

          {/* Created On */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
              <Clock size={17} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Created On
              </p>
              <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
                {getCreatedDate(event._id)}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto grid grid-cols-3 gap-2 border-t border-gray-100 pt-5 dark:border-gray-700">
          {/* View Details */}
          <Button
            nativeButton={false}
            render={<Link href={`/events/${event._id}`} />}
            variant="outline"
            className="h-10 w-full min-w-0 gap-1 rounded-lg border-green-200 bg-green-50/50 px-2 text-xs font-semibold text-green-700 transition-all hover:border-green-300 hover:bg-green-100 hover:text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400 dark:hover:bg-green-950 sm:text-sm">
            View Details
          </Button>

          {/* Edit Event */}
          <div className="min-w-0">
            <EditMyEventDialog event={event} onUpdated={onUpdated} />
          </div>

          {/* Delete Event */}
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button
                  variant="outline"
                  className="h-10 w-full min-w-0 gap-1 rounded-lg border-red-200 bg-red-50/50 px-2 text-xs font-semibold text-red-700 transition-all hover:border-red-300 hover:bg-red-100 hover:text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950 sm:text-sm">
                  <Trash2 size={15} />
                  Delete
                </Button>
              }
            />

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your event from the server.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction
                  onClick={() => onDelete(event._id)}
                  disabled={deletingId === event._id}
                  className="bg-red-600 text-white hover:bg-red-700">
                  {deletingId === event._id ? "Deleting..." : "Continue"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </article>
  );
};

export default ManageMyEventCard;
