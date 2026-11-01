"use client";

import EventsCard from "@/components/EventsCard";
import { IEvent } from "@/type/Type";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

interface EventsFilterProps {
  events: IEvent[];
}

const EventsFilter = ({ events }: EventsFilterProps) => {
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique event types
  const eventTypes = useMemo(
    () => [
      "All",
      ...Array.from(new Set(events.map((event) => event.eventType))),
    ],
    [events],
  );

  // Filter events by selected type and search query
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesType =
        selectedType === "All" || event.eventType === selectedType;

      const search = searchQuery.trim().toLowerCase();

      const matchesSearch =
        event.title.toLowerCase().includes(search) ||
        event.location.toLowerCase().includes(search);

      return matchesType && matchesSearch;
    });
  }, [events, selectedType, searchQuery]);

  return (
    <>
      {/* Event Filters and Search */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Event Type Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {eventTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                selectedType === type
                  ? "border-green-700 bg-green-700 text-white shadow-md shadow-green-700/20 dark:border-green-500 dark:bg-green-600"
                  : "border-gray-200 bg-white text-gray-600 hover:border-green-400 hover:bg-green-50 hover:text-green-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-green-600 dark:hover:bg-gray-800 dark:hover:text-green-400"
              }`}>
              {type}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:max-w-sm">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events or areas..."
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-green-500"
          />

          {/* Clear Search Button */}
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 text-gray-400 transition hover:bg-green-50 hover:text-green-700 dark:hover:bg-gray-800 dark:hover:text-green-400"
              aria-label="Clear search">
              <X size={17} />
            </button>
          )}
        </div>
      </div>

      {/* Filtered Event Count */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-bold text-green-700 dark:text-green-400">
            {filteredEvents.length}
          </span>{" "}
          of {events.length} events
        </p>
      </div>

      {/* Only Filtered Event Cards */}
      {filteredEvents.length > 0 ? (
        <EventsCard events={filteredEvents} />
      ) : (
        <div className="rounded-3xl border border-dashed border-green-200 bg-white px-6 py-16 text-center shadow-sm dark:border-green-900 dark:bg-gray-900">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 dark:bg-green-900/30">
            <Search size={30} className="text-green-600 dark:text-green-400" />
          </div>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            No Matching Events
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
            We couldn&apos;t find any events matching your search. Try another
            event type or search keyword.
          </p>

          {/* Clear All Filters */}
          <button
            type="button"
            onClick={() => {
              setSelectedType("All");
              setSearchQuery("");
            }}
            className="mt-6 cursor-pointer rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-500">
            Clear Filters
          </button>
        </div>
      )}
    </>
  );
};

export default EventsFilter;
