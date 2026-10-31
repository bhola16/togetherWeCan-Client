import { IEvent } from "@/type/Type";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  ExternalLink,
  HeartHandshake,
  Mail,
  MapPin,
  Sparkles,
  Tag,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EventDetailsPageProps {
  params: Promise<{ id: string }>;
}

const EventDetailsPage = async ({ params }: EventDetailsPageProps) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/events/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) notFound();

  if (!res.ok) {
    throw new Error("Failed to fetch event details");
  }

  const event: IEvent | null = await res.json();

  if (!event) notFound();

  const eventDate = new Date(`${event.eventDate.slice(0, 10)}T00:00:00Z`);

  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

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

        {/* Content Layout */}
        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Event Overview */}
            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-colors hover:shadow-md dark:border-gray-800 dark:bg-gray-900 sm:p-8">
              <div className="mb-7">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
                  Event Overview
                </span>

                <h2 className="mt-2 text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                  Get to Know the Event
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Here are the key details about this community event.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="group flex items-start gap-4 rounded-2xl border border-teal-100/80 bg-teal-50/60 p-5 transition hover:border-teal-200 hover:bg-teal-50 dark:border-teal-900/60 dark:bg-teal-950/30 dark:hover:border-teal-800 dark:hover:bg-teal-950/50">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700 transition group-hover:bg-teal-700 group-hover:text-white dark:bg-teal-900 dark:text-teal-300 dark:group-hover:bg-teal-600">
                    <Tag size={22} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Event Category
                    </p>
                    <p className="mt-2 break-words font-bold text-gray-900 dark:text-gray-100">
                      {event.eventType}
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-4 rounded-2xl border border-emerald-100/80 bg-emerald-50/60 p-5 transition hover:border-emerald-200 hover:bg-emerald-50 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/50">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-900 dark:text-emerald-300 dark:group-hover:bg-emerald-600">
                    <Users size={22} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Event Organizer
                    </p>
                    <p className="mt-2 break-all font-bold text-gray-900 dark:text-gray-100">
                      {event.organizerEmail}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* About Event */}
            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-colors hover:shadow-md dark:border-gray-800 dark:bg-gray-900 sm:p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  <HeartHandshake size={27} />
                </div>

                <div>
                  <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
                    Discover More
                  </span>
                  <h2 className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-white">
                    About This Event
                  </h2>
                </div>
              </div>

              <div className="mb-5 h-px w-full bg-gray-100 dark:bg-gray-800" />

              <p className="whitespace-pre-line text-base leading-8 text-gray-600 dark:text-gray-300">
                {event.description}
              </p>
            </section>

            {/* Before You Attend */}
            <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-teal-100 via-teal-50 to-emerald-100 p-6 text-gray-900 shadow-lg transition-colors duration-300 dark:from-gray-900 dark:via-teal-950 dark:to-emerald-950 dark:text-white sm:p-8">
              {/* Section Heading */}
              <div className="mb-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600/10 text-teal-700 dark:bg-white/10 dark:text-emerald-300">
                  <HeartHandshake size={26} />
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700 dark:text-emerald-300">
                  Make the Most of It
                </p>

                <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                  Before You Attend
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-700 dark:text-teal-100">
                  A little preparation can make your experience more enjoyable
                  and meaningful. Keep these helpful suggestions in mind before
                  joining the event.
                </p>
              </div>

              {/* Preparation Tips */}
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: Clock,
                    title: "Arrive on Time",
                    description:
                      "Try to arrive a little before the scheduled starting time. This gives you enough time to get familiar with the venue and settle in comfortably.",
                  },
                  {
                    icon: CalendarDays,
                    title: "Plan Ahead",
                    description:
                      "Check your schedule and make the necessary arrangements in advance. Consider your travel time and anything you might need to bring along.",
                  },
                  {
                    icon: Users,
                    title: "Engage with Others",
                    description:
                      "Be open to meeting new people, sharing ideas, and working together. Positive interaction helps build stronger community connections.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Follow Guidelines",
                    description:
                      "Pay attention to the instructions provided by the event organizer. Following the guidelines helps ensure a smooth and organized experience for everyone.",
                  },
                  {
                    icon: HeartHandshake,
                    title: "Respect Everyone",
                    description:
                      "Treat participants, volunteers, and organizers with kindness and respect. Be considerate of different perspectives and maintain a welcoming environment.",
                  },
                  {
                    icon: Sparkles,
                    title: "Make an Impact",
                    description:
                      "Participate actively and contribute wherever possible. Even small efforts, thoughtful conversations, and helpful actions can make a meaningful difference.",
                  },
                ].map((tip) => {
                  const Icon = tip.icon;

                  return (
                    <div
                      key={tip.title}
                      className="rounded-2xl border border-teal-800/10 bg-white/60 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/90 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="rounded-xl bg-teal-600/10 p-2.5 text-teal-700 dark:bg-emerald-400/15 dark:text-emerald-300">
                          <Icon size={21} />
                        </div>

                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {tip.title}
                        </h3>
                      </div>

                      <p className="text-sm leading-7 text-gray-700 dark:text-teal-100">
                        {tip.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Closing Message */}
              <div className="mt-7 flex items-start gap-3 rounded-2xl border border-teal-700/15 bg-teal-600/10 p-5 dark:border-emerald-300/20 dark:bg-emerald-400/10">
                <HeartHandshake
                  size={23}
                  className="mt-0.5 shrink-0 text-teal-700 dark:text-emerald-300"
                />

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    Together, We Can Make a Difference
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-700 dark:text-teal-100">
                    Your presence, participation, and willingness to help make
                    every community event more valuable.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-8">
            {/* Countdown Card */}
            <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="border-b border-gray-100 p-6 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400">
                    <Clock size={22} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Event Countdown
                    </p>

                    <h2 className="mt-1 text-lg font-extrabold text-gray-900 dark:text-white">
                      {isToday
                        ? "It's Event Day!"
                        : isUpcoming
                          ? "Coming Soon"
                          : "Event Finished"}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {isUpcoming ? (
                  <div className="rounded-2xl bg-gradient-to-br from-teal-100 via-teal-50 to-emerald-100 p-7 text-center text-gray-900 shadow-inner dark:from-teal-800 dark:via-teal-800 dark:to-emerald-900 dark:text-white">
                    <p className="text-sm font-medium text-teal-800 dark:text-teal-100">
                      {isToday ? "The event is scheduled for" : "Only"}
                    </p>

                    <p className="my-3 text-5xl font-extrabold tracking-tight">
                      {isToday ? "Today" : daysRemaining}
                    </p>

                    {!isToday && (
                      <p className="text-sm font-semibold text-teal-800 dark:text-teal-100">
                        {daysRemaining === 1
                          ? "day remaining"
                          : "days remaining"}
                      </p>
                    )}

                    <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-emerald-500/70 dark:bg-emerald-300/70" />
                  </div>
                ) : (
                  <div className="rounded-2xl bg-gray-100 p-6 text-center dark:bg-gray-800">
                    <CalendarCheck
                      size={32}
                      className="mx-auto text-gray-400 dark:text-gray-500"
                    />

                    <p className="mt-3 font-bold text-gray-700 dark:text-gray-200">
                      This event has ended
                    </p>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Thank you for your interest.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Contact Organizer */}
            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                <Mail size={23} />
              </div>

              <h2 className="mt-5 text-xl font-extrabold text-gray-900 dark:text-white">
                Need More Information?
              </h2>

              <p className="mt-2 text-sm leading-7 text-gray-500 dark:text-gray-400">
                Have questions or need clarification? Contact the event
                organizer directly for more information.
              </p>

              <a
                href={`mailto:${event.organizerEmail}`}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-amber-600 hover:shadow-md">
                Contact Organizer
                <ArrowRight size={17} />
              </a>
            </section>

            {/* Explore Events */}

            {/* Explore Events */}

            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-100 via-teal-50 to-teal-100 p-6 text-gray-900 shadow-md transition-all duration-300 dark:from-gray-900 dark:via-teal-950 dark:to-emerald-950 dark:text-white">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border-[18px] border-teal-700/10 dark:border-teal-300/10" />

              <div className="relative">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
                  <Sparkles size={22} />
                </div>

                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
                  Discover More Events
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
                  Explore other activities and find more opportunities to
                  connect with your community.
                </p>

                <Link
                  href="/events"
                  className="mt-6 ml-auto flex w-fit items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:text-gray-950 dark:hover:bg-emerald-400">
                  Explore Events
                  <ExternalLink size={16} />
                </Link>
              </div>
            </section>
          </aside>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-7 dark:border-gray-800 sm:flex-row">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 sm:text-left">
            Building stronger communities, one event at a time.
          </p>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-teal-800 dark:hover:bg-gray-800 dark:hover:text-teal-400">
            <ArrowLeft size={16} />
            Back to All Events
          </Link>
        </div>
      </div>
    </main>
  );
};

export default EventDetailsPage;
