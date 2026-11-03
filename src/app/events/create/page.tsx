"use client";

"use client";

import {
  AlertCircle,
  CalendarDays,
  FileText,
  Image as ImageIcon,
  Mail,
  MapPin,
  RefreshCw,
  Send,
  Tag,
  Type,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useEffect, useState, type FormEvent } from "react";
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
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenClient";
const API_URL = (
  process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

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

  const { data: session, isPending } = authClient.useSession();

  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // JWT authentication states.
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // API error and retry states.
  const [hasApiError, setHasApiError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Validate JWT before allowing access to this page.
  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/login");
      return;
    }

    let isMounted = true;

    const validateJWT = async () => {
      try {
        setHasApiError(false);

        const { token, error } = await getTokenFromClient();

        if (error || !token) {
          if (isMounted) {
            toast.error("Authentication failed. Please log in again.");
            router.replace("/login");
          }
          return;
        }

        // Verify JWT through a protected backend endpoint.
        const response = await fetch(`${API_URL}/my-events`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (response.status === 401 || response.status === 403) {
          if (isMounted) {
            toast.error("Your session has expired. Please log in again.");
            router.replace("/login");
          }
          return;
        }

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }

        if (isMounted) {
          setIsAuthorized(true);
          setHasApiError(false);
        }
      } catch (error) {
        console.log("JWT validation error:", error);

        if (isMounted) {
          setIsAuthorized(false);
          setHasApiError(true);

          toast.error(
            "Unable to connect to the server. Please try again later.",
          );
        }
      } finally {
        if (isMounted) {
          setIsCheckingAuth(false);
        }
      }
    };

    void validateJWT();

    return () => {
      isMounted = false;
    };
  }, [router, isPending, session?.user, retryCount]);

  // Retry API validation.
  const handleRetry = () => {
    setIsCheckingAuth(true);
    setHasApiError(false);
    setRetryCount((prev) => prev + 1);
  };

  // Get today's date in local timezone.
  const today = new Date();

  const minDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

  // Event date must be after today.
  const isInvalidDate = eventDate !== "" && eventDate <= minDate;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (isPending) {
      toast.error("Please wait while authentication is loading.");
      return;
    }

    if (!isAuthorized || !session?.user) {
      toast.error("Please log in to create an event.");
      router.push("/login");
      return;
    }

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
      eventDate,
      location: formData.get("location"),
      imageUrl: formData.get("imageUrl"),
      description: formData.get("description"),
      organizerEmail: session.user.email,
    };

    try {
      setIsSubmitting(true);

      // Get JWT token from Better Auth.
      const { token, error } = await getTokenFromClient();

      if (error || !token) {
        toast.error(
          error?.message || "Authentication failed. Please log in again.",
        );
        router.push("/login");
        return;
      }

      // Send event data with JWT authentication.
      const res = await fetch(`${API_URL}/create-events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });

      const result = await res.json().catch(() => null);

      if (res.status === 401 || res.status === 403) {
        toast.error("Your session has expired. Please log in again.");
        router.push("/login");
        return;
      }

      if (!res.ok) {
        toast.error(
          result?.message || "Failed to create event. Please try again.",
        );
        return;
      }

      toast.success("Event created successfully!");

      form.reset();
      setEventDate("");
      setEventType("");

      router.push("/events");
    } catch (error) {
      console.log("Create event error:", error);

      toast.error(
        "Unable to connect to the server. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading while authentication is being checked.
  if (isCheckingAuth || isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Verifying authentication...</p>
      </div>
    );
  }

  // Show an inline error if the backend is unavailable.
  if (hasApiError) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
        <div className="w-full max-w-2xl rounded-2xl border border-dashed border-red-200 bg-white px-6 py-16 text-center dark:border-red-900 dark:bg-gray-900">
          <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Unable to Load Create Event Page
          </h2>

          <p className="mx-auto mt-2 max-w-md text-gray-500 dark:text-gray-400">
            We couldn't connect to the server or verify your access. Please try
            again later.
          </p>

          <Button
            onClick={handleRetry}
            className="mt-6 bg-green-700 text-white hover:bg-green-800">
            <RefreshCw size={16} className="mr-2" />
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  // Prevent unauthorized users from accessing the page.
  if (!isAuthorized || !session?.user) {
    return null;
  }

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
                  className="flex items-center text-gray-700 dark:text-gray-200">
                  <Type
                    size={16}
                    className="mr-2 text-green-700 dark:text-green-400"
                  />
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
                    className="flex items-center text-gray-700 dark:text-gray-200">
                    <Tag
                      size={16}
                      className="mr-2 text-green-700 dark:text-green-400"
                    />
                    Event Type
                    <span className="ml-1 text-red-500">*</span>
                  </Label>

                  <Select
                    value={eventType}
                    onValueChange={(value) => setEventType(value ?? "")}>
                    <SelectTrigger
                      id="eventType"
                      className="h-11 w-full border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>

                    <SelectContent className="border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                      {types.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="focus:bg-gray-100 focus:text-gray-900 dark:focus:bg-gray-700 dark:focus:text-white">
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
                    className="flex items-center text-gray-700 dark:text-gray-200">
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
                      Select a date after today.
                    </p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label
                  htmlFor="location"
                  className="flex items-center text-gray-700 dark:text-gray-200">
                  <MapPin
                    size={16}
                    className="mr-2 text-green-700 dark:text-green-400"
                  />
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
                  className="flex items-center text-gray-700 dark:text-gray-200">
                  <ImageIcon
                    size={16}
                    className="mr-2 text-green-700 dark:text-green-400"
                  />
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
                  className="flex items-center text-gray-700 dark:text-gray-200">
                  <FileText
                    size={16}
                    className="mr-2 text-green-700 dark:text-green-400"
                  />
                  Event Description
                  <span className="ml-1 text-red-500">*</span>
                </Label>

                <Textarea
                  id="description"
                  name="description"
                  rows={5}
                  placeholder="Describe your event, its purpose, activities, and how people can participate..."
                  required
                  className="min-h-20 max-h-32 resize-y border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:ring-green-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>

              {/* Organizer Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="organizerEmail"
                  className="flex items-center text-gray-700 dark:text-gray-200">
                  <Mail
                    size={16}
                    className="mr-2 text-green-700 dark:text-green-400"
                  />
                  Organizer Email Address
                  <span className="ml-1 text-red-500">*</span>
                </Label>

                <Input
                  id="organizerEmail"
                  name="organizerEmail"
                  type="email"
                  defaultValue={session?.user?.email || ""}
                  required
                  placeholder="example@email.com"
                  className="h-11 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:ring-green-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>

              {/* Submit Button */}
              <div className="border-t border-gray-100 pt-6 dark:border-gray-800">
                <Button
                  type="submit"
                  disabled={
                    isPending ||
                    !session?.user ||
                    !eventDate ||
                    isInvalidDate ||
                    !eventType ||
                    isSubmitting
                  }
                  className="h-12 w-full bg-green-700 text-sm font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50">
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
