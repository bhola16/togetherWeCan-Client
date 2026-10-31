
"use client";

import { IEvent } from "@/type/Type";
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
import {
  CalendarDays,
  CheckCircle2,
  Edit,
  MapPin,
  Trash2,
} from "lucide-react";
import Link from "next/link";

interface ManageMyEventCardProps {
  event: IEvent;
  onDelete: (eventId: string) => void;
  deletingId: string | null;
}

const ManageMyEventCard = ({
  event,
  onDelete,
  deletingId,
}: ManageMyEventCardProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
      {/* Event Image */}
      <div className="group relative h-56 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Event Type */}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-green-700">
          {event.eventType}
        </span>

        {/* Owner Badge */}
        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
          <CheckCircle2 size={13} />
          Created by You
        </span>

        {/* Event Title */}
        <h2 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white">
          {event.title}
        </h2>
      </div>

      {/* Event Information */}
      <div className="p-5">
        <p className="mb-4 line-clamp-2 min-h-12 text-sm leading-6 text-gray-600 dark:text-gray-400">
          {event.description}
        </p>

        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <CalendarDays
              size={17}
              className="shrink-0 text-green-600"
            />
            <span>{event.eventDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={17} className="shrink-0 text-green-600" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 dark:border-gray-700">
          <Link
            href={`/events/${event._id}`}
            className="col-span-1 flex items-center justify-center rounded-lg bg-gray-100 px-2 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            View Details
          </Link>

          <Link
            href={`/events/edit/${event._id}`}
            className="flex items-center justify-center gap-1 rounded-lg bg-blue-50 px-2 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
          >
            <Edit size={15} />
            Edit
          </Link>

          <AlertDialog>
            <AlertDialogTrigger
              render={<Button variant="outline" />}
              className="border-red-400 text-red-700 hover:bg-red-50"
            >
              <Trash2 size={15} />
              Delete
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you absolutely sure?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone. This will permanently
                  delete your event from the server.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction
                  onClick={() => onDelete(event._id)}
                  disabled={deletingId === event._id}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  {deletingId === event._id ? "Deleting..." : "Continue"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default ManageMyEventCard;
