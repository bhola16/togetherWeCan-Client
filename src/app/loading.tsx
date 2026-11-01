import { HeartHandshake, Users } from "lucide-react";

const Loading = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-6xl">
        {/* Loading Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
            <HeartHandshake
              size={34}
              className="animate-pulse text-green-600 dark:text-green-400"
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Bringing People Together
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Please wait while we prepare your community experience...
          </p>
        </div>

        {/* Event Skeleton Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="h-52 bg-gray-200 dark:bg-gray-800" />

              <div className="p-5">
                <div className="mb-4 h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="mb-4 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="mb-3 h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
                <div className="mb-6 h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />

                <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                  <div className="h-5 w-24 rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-9 w-28 rounded-lg bg-gray-200 dark:bg-gray-800" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Footer */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
          <Users size={18} className="animate-pulse" />
          <span>Every small action makes a difference...</span>
        </div>
      </div>
    </main>
  );
};

export default Loading;