import { Archive, ArrowRight } from "lucide-react";
import Link from "next/link";

const PastEvents = () => {
  return (
    <section className="bg-[#F8FAF7] px-6 py-8 md:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <Archive size={23} />
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-[#101A16] sm:text-4xl">
                Past Events
              </h2>
            </div>

            <p className="text-sm font-semibold text-green-700">
              Celebrating Our Community Impact
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Take a look back at the events, activities, and initiatives that
              brought our community together. Every contribution, every
              volunteer, and every small action helped create meaningful change.
            </p>
          </div>

          <Link
            href="/Upcomingevents"
            className="group inline-flex shrink-0 items-center gap-2 font-bold text-green-700 transition hover:text-green-900">
            Explore More Events
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PastEvents;
