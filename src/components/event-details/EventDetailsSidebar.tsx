import { IEvent } from "@/type/Type";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Clock,
  ExternalLink,
  Mail,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface EventDetailsSidebarProps {
  event: IEvent;
  daysRemaining: number;
  isUpcoming: boolean;
  isToday: boolean;
}

const EventDetailsSidebar = ({
  event,
  daysRemaining,
  isUpcoming,
  isToday,
}: EventDetailsSidebarProps) => {
  return (
    <>
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
                    {daysRemaining === 1 ? "day remaining" : "days remaining"}
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
            Have questions or need clarification? Contact the event organizer
            directly for more information.
          </p>

          <a
            href={`mailto:${event.organizerEmail}`}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-amber-600 hover:shadow-md">
            Contact Organizer
            <ArrowRight size={17} />
          </a>
        </section>

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
              Explore other activities and find more opportunities to connect
              with your community.
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

      {/* Bottom Navigation */}
      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-7 dark:border-gray-800 sm:flex-row">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 sm:text-left">
          Building stronger communities, one event at a time.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-teal-800 dark:hover:bg-gray-800 dark:hover:text-teal-400">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default EventDetailsSidebar;
