import { IEvent } from "@/type/Type";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  HeartHandshake,
  Tag,
  Users,
} from "lucide-react";
import JoinEventOption from "../shared/JoinEventOption";

interface EventDetailsContentProps {
  event: IEvent;
}

const EventDetailsContent = ({ event }: EventDetailsContentProps) => {
  return (
    <div className="space-y-8 lg:col-span-2">
      <JoinEventOption event={event} />

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
            A little preparation can make your experience more enjoyable and
            meaningful. Keep these helpful suggestions in mind before joining
            the event.
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
              Your presence, participation, and willingness to help make every
              community event more valuable.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetailsContent;
