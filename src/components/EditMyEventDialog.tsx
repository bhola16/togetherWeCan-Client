"use client";

import { IEvent } from "@/type/Type";
import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  AlertCircle,
  CalendarDays,
  Edit,
  FileText,
  Image as ImageIcon,
  Mail,
  MapPin,
  Send,
  Tag,
  Type,
} from "lucide-react";

import { Button } from "@/components/ui/button";
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

interface EditMyEventDialogProps {
  event: IEvent;
  onUpdated: (updatedEvent: IEvent) => void;
}

const getTodayDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const EditMyEventDialog = ({ event, onUpdated }: EditMyEventDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const minDate = getTodayDate();

  const [formData, setFormData] = useState({
    title: event.title || "",
    eventType: event.eventType || "",
    eventDate: event.eventDate || "",
    location: event.location || "",
    imageUrl: event.imageUrl || "",
    description: event.description || "",
    organizerEmail: event.organizerEmail || "",
  });

  // Populate the form whenever the dialog opens.
  useEffect(() => {
    if (open) {
      setFormData({
        title: event.title || "",
        eventType: event.eventType || "",
        eventDate: event.eventDate || "",
        location: event.location || "",
        imageUrl: event.imageUrl || "",
        description: event.description || "",
        organizerEmail: event.organizerEmail || "",
      });
    }
  }, [open, event]);

  const isInvalidDate = !!formData.eventDate && formData.eventDate < minDate;

  // Handle input changes.
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Update event using PATCH.
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.eventType) {
      toast.error("Please select an event type.");
      return;
    }

    if (isInvalidDate) {
      toast.error("Please select today or a future date.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/events/${event._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseText = await res.text();

      let data: { message?: string } = {};

      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        console.error("Invalid server response:", responseText);

        throw new Error(`Invalid server response. HTTP status: ${res.status}`);
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to update event.");
      }

      // Notify the parent page if a valid callback was provided.
      const updatedEvent: IEvent = {
        ...event,
        ...formData,
      };

      if (typeof onUpdated === "function") {
        onUpdated(updatedEvent);
      }

      toast.success(data.message || "Event updated successfully!");

      setOpen(false);
    } catch (error) {
      console.error("Update event error:", error);

      toast.error(
        error instanceof Error ? error.message : "Unable to update event.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="flex w-full items-center justify-center gap-1 rounded-lg border-0 bg-blue-50 px-2 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
            <Edit size={15} />
            Edit
          </Button>
        }
      />

      <DialogContent className="w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Edit Your Event
          </DialogTitle>

          <DialogDescription>
            Update your event information and keep your community informed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* Event Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              <Type size={16} className="mr-2 inline text-green-700" />
              Event Title <span className="text-red-500">*</span>
            </Label>

            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your event title"
              required
            />
          </div>

          {/* Event Type and Date */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>
                <Tag size={16} className="mr-2 inline text-green-700" />
                Event Type <span className="text-red-500">*</span>
              </Label>

              <Select
                value={formData.eventType}
                onValueChange={(value) =>
                  setFormData((previousData) => ({
                    ...previousData,
                    eventType: value ?? "",
                  }))
                }>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>

                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventDate">
                <CalendarDays
                  size={16}
                  className="mr-2 inline text-green-700"
                />
                Event Date <span className="text-red-500">*</span>
              </Label>

              <Input
                id="eventDate"
                name="eventDate"
                type="date"
                min={minDate}
                value={formData.eventDate}
                onChange={handleChange}
                required
              />

              {isInvalidDate ? (
                <p className="flex items-center gap-1.5 text-xs text-red-600">
                  <AlertCircle size={14} />
                  Please select today or a future date.
                </p>
              ) : (
                <p className="text-xs text-gray-400">
                  Select today or a future date.
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">
              <MapPin size={16} className="mr-2 inline text-green-700" />
              Location / Venue <span className="text-red-500">*</span>
            </Label>

            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter event location or venue"
              required
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="imageUrl">
              <ImageIcon size={16} className="mr-2 inline text-green-700" />
              Thumbnail Image URL <span className="text-red-500">*</span>
            </Label>

            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/event-image.jpg"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              <FileText size={16} className="mr-2 inline text-green-700" />
              Event Description <span className="text-red-500">*</span>
            </Label>

            <Textarea
              id="description"
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your event, its purpose, activities, and how people can participate..."
              required
              className="min-h-20 max-h-32 resize-y"
            />
          </div>

          {/* Organizer Email */}
          <div className="space-y-2">
            <Label htmlFor="organizerEmail">
              <Mail size={16} className="mr-2 inline text-green-700" />
              Organizer Email Address <span className="text-red-500">*</span>
            </Label>

            <Input
              id="organizerEmail"
              name="organizerEmail"
              type="email"
              value={formData.organizerEmail}
              onChange={handleChange}
              placeholder="example@email.com"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="border-t pt-5">
            <Button
              type="submit"
              disabled={
                !formData.eventDate ||
                isInvalidDate ||
                !formData.eventType ||
                isSubmitting
              }
              className="h-12 w-full bg-green-700 font-semibold text-white hover:bg-green-800">
              <Send size={17} className="mr-2" />
              {isSubmitting ? "Updating..." : "Update Event"}
            </Button>

            <p className="mt-3 text-center text-xs text-gray-400">
              Fields marked with <span className="text-red-500">*</span> are
              required.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMyEventDialog;
