import EventDetailsContent from "@/components/event-details/EventDetailsContent";
import EventDetailsHero from "@/components/event-details/EventDetailsHero";
import EventDetailsSidebar from "@/components/event-details/EventDetailsSidebar";
import RetryButton from "@/components/shared/RetryButton";
import { IEvent } from "@/type/Type";
import { notFound } from "next/navigation";

interface EventDetailsPageProps {
  params: Promise<{ id: string }>;
}

const API_URL = (
  process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

const EventDetailsPage = async ({ params }: EventDetailsPageProps) => {
  const { id } = await params;

  let res: Response;

  try {
    // Public endpoint: no authentication or JWT required.
    res = await fetch(`${API_URL}/events/${id}`, {
      cache: "no-store",
    });
  } catch {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7faf9] px-4 dark:bg-gray-950">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Unable to Load Event
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
            We couldn&apos;t connect to the server. Please check your connection
            and try again later.
          </p>

          <RetryButton />
        </div>
      </main>
    );
  }

  if (res.status === 404 || res.status === 400) {
    notFound();
  }

  if (!res.ok) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7faf9] px-4 dark:bg-gray-950">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Something Went Wrong
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
            We couldn&apos;t load this event right now. Please try again later.
          </p>

          <RetryButton />
        </div>
      </main>
    );
  }

  let event: IEvent | null = null;

  try {
    event = await res.json();
  } catch {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7faf9] px-4 dark:bg-gray-950">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Unable to Load Event
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
            The server returned an invalid response. Please try again later.
          </p>

          <RetryButton />
        </div>
      </main>
    );
  }

  if (!event) {
    notFound();
  }

  // Event date.
  const eventDate = new Date(`${event.eventDate.slice(0, 10)}T00:00:00Z`);

  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  // Calculate remaining days.
  const today = new Date();

  const todayUTC = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
  );

  const daysRemaining = Math.ceil(
    (eventDate.getTime() - todayUTC) / (1000 * 60 * 60 * 24),
  );

  const isUpcoming = daysRemaining >= 0;
  const isToday = daysRemaining === 0;

  const statusText = isToday
    ? "Happening Today"
    : isUpcoming
      ? "Upcoming Event"
      : "Completed";

  return (
    <main className="min-h-screen bg-[#f7faf9] pb-16 transition-colors duration-300 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 pt-7 sm:px-6 lg:px-8">
        <EventDetailsHero
          event={event}
          formattedDate={formattedDate}
          isUpcoming={isUpcoming}
          statusText={statusText}
        />

        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          <EventDetailsContent event={event} />

          <EventDetailsSidebar
            event={event}
            daysRemaining={daysRemaining}
            isUpcoming={isUpcoming}
            isToday={isToday}
          />
        </div>
      </div>
    </main>
  );
};

export default EventDetailsPage;
