
import EventDetailsContent from "@/components/event-details/EventDetailsContent";
import EventDetailsHero from "@/components/event-details/EventDetailsHero";
import EventDetailsSidebar from "@/components/event-details/EventDetailsSidebar";
import { auth } from "@/lib/auth";
import { IEvent } from "@/type/Type";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

interface EventDetailsPageProps {
  params: Promise<{ id: string }>;
}

const API_URL = (
  process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

const EventDetailsPage = async ({ params }: EventDetailsPageProps) => {
  const { id } = await params;

  const requestHeaders = await headers();

  // Check authentication.
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session) {
    redirect("/login");
  }

  // Get JWT token.
  let token: string;

  try {
    const jwtToken = await auth.api.getToken({
      headers: requestHeaders,
    });

    if (!jwtToken?.token) {
      redirect("/login");
    }

    token = jwtToken.token;
  } catch {
    redirect("/login");
  }

  let res: Response;

  try {
    res = await fetch(`${API_URL}/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
  } catch {
    throw new Error("Unable to connect to the event server.");
  }

  // Handle authentication failure.
  if (res.status === 401 || res.status === 403) {
    redirect("/login");
  }

  // Handle missing or invalid event IDs.
  if (res.status === 404 || res.status === 400) {
    notFound();
  }

  if (!res.ok) {
    const errorMessage = await res.text();

    console.error("Event API error:", {
      url: `${API_URL}/events/${id}`,
      status: res.status,
      message: errorMessage,
    });

    throw new Error(`Failed to fetch event details: ${res.status}`);
  }

  const event: IEvent | null = await res.json();

  if (!event) {
    notFound();
  }

  // Event Date
  const eventDate = new Date(`${event.eventDate.slice(0, 10)}T00:00:00Z`);

  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  // Calculate Remaining Days
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
