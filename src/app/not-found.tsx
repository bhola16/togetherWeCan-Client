import { ArrowLeft, HeartHandshake, SearchX } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-16 dark:bg-gray-950">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
          <HeartHandshake
            size={42}
            className="text-green-600 dark:text-green-400"
          />
        </div>

        <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-600 dark:text-green-400">
          404 — Page Not Found
        </p>

        <h1 className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
          Lost in the Community?
        </h1>

        <p className="mx-auto mt-4 max-w-md leading-7 text-gray-500 dark:text-gray-400">
          Oops! The page you're looking for doesn't exist or may have been
          moved. Let's get you back and find a way to make a difference together.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <Link
            href="/events"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:border-green-600 hover:text-green-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-green-500 dark:hover:text-green-400"
          >
            <SearchX size={18} />
            Explore Events
          </Link>
        </div>

        <p className="mt-10 text-sm text-gray-400 dark:text-gray-500">
          Small actions. Greater impact.
        </p>
      </div>
    </main>
  );
};

export default NotFound;