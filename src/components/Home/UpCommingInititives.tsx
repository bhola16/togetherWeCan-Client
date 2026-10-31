
import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";

const initiatives = [
  {
    id: 1,
    title: "Green Bangladesh Campaign",
    category: "Tree Plantation",
    date: "November 15, 2026",
    time: "9:00 AM",
    location: "Dhaka, Bangladesh",
    volunteers: "120+ Joined",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b",
    description:
      "Join us in planting trees and creating a greener, healthier environment for future generations.",
    color: "bg-green-100 text-green-700",
  },
  {
    id: 2,
    title: "Winter Warmth for Everyone",
    category: "Donation Drive",
    date: "November 22, 2026",
    time: "10:00 AM",
    location: "Gopalganj, Bangladesh",
    volunteers: "85+ Joined",
    image: "https://images.unsplash.com/photo-1489493585363-d69421e0edd3",
    description:
      "Help distribute warm clothes and blankets to underprivileged families during winter.",
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: 3,
    title: "Clean Streets, Green Future",
    category: "Community Cleanup",
    date: "November 28, 2026",
    time: "8:00 AM",
    location: "Khulna, Bangladesh",
    volunteers: "95+ Joined",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
    description:
      "Work together to clean public spaces and promote a cleaner, healthier community.",
    color: "bg-blue-100 text-blue-700",
  },
];

const UpCommingInititives = () => {
  return (
    <section className="bg-[#F8FAF7] px-6 py-16 dark:bg-gray-950 md:py-20">
      <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-3">
            <CalendarDays
              size={30}
              className="text-green-700 dark:text-green-400"
            />

            <h2 className="text-3xl font-extrabold tracking-tight text-[#101A16] dark:text-white sm:text-4xl">
              Upcoming Initiatives
            </h2>
          </div>

          <p className="text-sm font-semibold text-green-700 dark:text-green-400">
            Recent Community Events
          </p>

          <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
            Explore upcoming community events and discover opportunities to
            volunteer, connect with others, and make a positive impact. More
            initiatives will be added soon!
          </p>
        </div>

        <Link
          href="/events"
          className="group inline-flex shrink-0 items-center gap-2 font-bold text-green-700 transition hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
        >
          View All Events
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
};

export default UpCommingInititives;
