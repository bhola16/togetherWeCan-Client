
"use client";

import {
  AlertCircle,
  CalendarDays,
  FileText,
  Image as ImageIcon,
  Mail,
  MapPin,
  Send,
  Tag,
  Type,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const types = [
  "Environmental",
  "Education",
  "Donation",
  "Volunteer",
  "Social Welfare",
  "Healthcare",
  "Community Service",
  "Fundraising",
  "Other",
];

const CreateEventPage = () => {
  const router = useRouter();

  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get today's date in local timezone
  const today = new Date();

  const minDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

  // Check whether the selected date is today or in the past
  const isInvalidDate = eventDate !== "" && eventDate <= minDate;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!eventDate || isInvalidDate) {
      toast.error("Please select a valid future event date.");
      return;
    }

    if (!eventType) {
      toast.error("Please select an event type.");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const eventData = {
      title: formData.get("eventTitle"),
      eventType,
      eventDate: formData.get("eventDate"),
      location: formData.get("location"),
      imageUrl: formData.get("imageUrl"),
      description: formData.get("description"),
      organizerEmail: formData.get("organizerEmail"),
    };

    try {
      setIsSubmitting(true);

      const res = await fetch("http://localhost:8000/create-events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to create event.");
      }

      toast.success("Event created successfully!");

      form.reset();
      setEventDate("");
      setEventType("");

      router.refresh();
    } catch (error) {
      console.error("Create event error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12 transition-colors duration-300 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Page Heading */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
            <CalendarDays size={28} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Create an Event
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
            Bring people together and make a positive impact in your community.
            Fill in the details below to create your event.
          </p>
        </div>

        {/* Event Form */}
        <Card className="border-gray-100 bg-white shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 dark:text-white">
              Event Information
            </CardTitle>

            <CardDescription className="text-gray-500 dark:text-gray-400">
              Provide the necessary details about your upcoming event.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Title */}
              <div className="space-y-2">
                <Label
                  htmlFor="eventTitle"
                  className="flex items-center text-gray-700 dark:text-gray-200"
                >
                  <Type size={16} className="mr-2 text-green-700 dark:text-green-400" />
                  Event Title
                  <span className="ml-1 text-red-500">*</span>
                </Label>

                <Input
                  id="eventTitle"
                  name="eventTitle"
                  type="text"
                  placeholder="Enter your event title"
                  required
                  className="h-11 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:ring-green-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>

              {/* Event Type and Event Date */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Event Type */}
                <div className="space-y-2">
                  <Label
                    htmlFor="eventType"
                    className="flex items-center text-gray-700 dark:text-gray-200"
                  >
                    <Tag size={16} className="mr-2 text-green-700 dark:text-green-400" />
                    Event Type
                    <span className="ml-1 text-red-500">*</span>
                  </Label>

                  <Select
                    value={eventType}
                    onValueChange={(value) => setEventType(value ?? "")}
                  >
                    <SelectTrigger className="h-11 w-full border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>

                    <SelectContent className="border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                      {types.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="focus:bg-gray-100 focus:text-gray-900 dark:focus:bg-gray-700 dark:focus:text-white"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Event Date */}
                <div className="space-y-2">
                  <Label
                    htmlFor="eventDate"
                    className="flex items-center text-gray-700 dark:text-gray-200"
                  >
                    <CalendarDays
                      size={16}
                      className="mr-2 text-green-700 dark:text-green-400"
                    />
                    Event Date
                    <span className="ml-1 text-red-500">*</span>
                  </Label>

                  <Input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    min={minDate}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    className="h-11 border-gray-200 bg-white text-gray-900 focus-visible:ring-green-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />

                  {isInvalidDate ? (
                    <p className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                      <AlertCircle size={14} />
                      Please select a future date.
                    </p>
                  ) : (
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Select a future date.
                    </p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label
                  htmlFor="location"
                  className="flex items-center text-gray-700 dark:text-gray-200"
                >
                  <MapPin size={16} className="mr-2 text-green-700 dark:text-green-400" />
                  Location / Venue
                  <span className="ml-1 text-red-500">*</span>
                </Label>

                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Enter event location or venue"
                  required
                  className="h-11 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:ring-green-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>

              {/* Thumbnail Image URL */}
              <div className="space-y-2">
                <Label
                  htmlFor="imageUrl"
                  className="flex items-center text-gray-700 dark:text-gray-200"
                >
                  <ImageIcon size={16} className="mr-2 text-green-700 dark:text-green-400" />
                  Thumbnail Image URL
                  <span className="ml-1 text-red-500">*</span>
                </Label>

                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  placeholder="https://example.com/event-image.jpg"
                  required
                  className="h-11 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:ring-green-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>

              {/* Event Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="flex items-center text-gray-700 dark:text-gray-200"
                >
                  <FileText size={16} className="mr-2 text-green-700 dark:text-green-400" />
                  Event Description
                  <span className="ml-1 text-red-500">*</span>
                </Label>

                <Textarea
                  id="description"
                  name="description"
                  rows={5}
                  placeholder="Describe your event, its purpose, activities, and how people can participate..."
                  required
                  className="min-h-32 resize-y border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:ring-green-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>

              {/* Organizer Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="organizerEmail"
                  className="flex items-center text-gray-700 dark:text-gray-200"
                >
                  <Mail size={16} className="mr-2 text-green-700 dark:text-green-400" />
                  Organizer Email Address
                  <span className="ml-1 text-red-500">*</span>
                </Label>

                <Input
                  id="organizerEmail"
                  name="organizerEmail"
                  type="email"
                  placeholder="example@email.com"
                  required
                  className="h-11 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:ring-green-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>

              {/* Submit Button */}
              <div className="border-t border-gray-100 pt-6 dark:border-gray-800">
                <Button
                  type="submit"
                  disabled={
                    !eventDate || isInvalidDate || !eventType || isSubmitting
                  }
                  className="h-12 w-full bg-green-700 text-sm font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send size={17} className="mr-2" />
                  {isSubmitting ? "Publishing..." : "Publish Event"}
                </Button>

                <p className="mt-3 text-center text-xs text-gray-400 dark:text-gray-500">
                  Fields marked with <span className="text-red-500">*</span> are
                  required.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CreateEventPage;
