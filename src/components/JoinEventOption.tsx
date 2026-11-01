"use client";

import { authClient } from "@/lib/auth-client";
import { IEvent } from "@/type/Type";
import { CheckCircle2, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface JoinEventCardProps {
  event: IEvent;
}

const API_URL = (
  process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

const JoinEventOption = ({ event }: JoinEventCardProps) => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [checkingParticipation, setCheckingParticipation] = useState(true);

  // Check participation from MongoDB when the page loads.
  useEffect(() => {
    if (isPending) return;

    if (!user) {
      setJoined(false);
      setCheckingParticipation(false);
      return;
    }

    let cancelled = false;

    const checkParticipation = async () => {
      setCheckingParticipation(true);

      try {
        const params = new URLSearchParams({
          userId: user.id,
          eventId: event._id,
        });

        const res = await fetch(
          `${API_URL}/eventParticipants/check?${params.toString()}`,
          {
            cache: "no-store",
          },
        );

        if (!res.ok) {
          throw new Error("Failed to check participation.");
        }

        const data: { joined: boolean } = await res.json();

        if (!cancelled) {
          setJoined(data.joined);
        }
      } catch (error) {
        console.error("Check participation error:", error);

        if (!cancelled) {
          toast.error("Unable to check your participation.");
        }
      } finally {
        if (!cancelled) {
          setCheckingParticipation(false);
        }
      }
    };

    void checkParticipation();

    return () => {
      cancelled = true;
    };
  }, [user?.id, isPending, event._id]);

  // Join event.
  const handleJoinEvent = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (joined || loading || checkingParticipation) return;

    setLoading(true);

    try {
      const participantData = {
        eventId: event._id,
        eventTitle: event.title,
        eventDate: event.eventDate,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userImage: user.image || "",
      };

      const res = await fetch(`${API_URL}/eventParticipants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(participantData),
      });

      const data: { message?: string } = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setJoined(true);
        }

        toast.error(data.message || "Failed to join the event.");
        return;
      }

      setJoined(true);
      toast.success("You have successfully joined this event!");
    } catch (error) {
      console.error("Join event error:", error);
      toast.error("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
          <Users size={22} />
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Join This Event
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Be part of the community!
          </p>
        </div>
      </div>

      <p className="mb-5 text-sm leading-6 text-gray-600 dark:text-gray-300">
        Join this event and contribute your time and effort to make a positive
        difference in the community.
      </p>

      <button
        type="button"
        onClick={handleJoinEvent}
        disabled={loading || joined || checkingParticipation || isPending}
        className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
          joined
            ? "cursor-not-allowed bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
            : "bg-green-600 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        }`}>
        {isPending || checkingParticipation ? (
          "Checking..."
        ) : loading ? (
          "Joining..."
        ) : joined ? (
          <>
            <CheckCircle2 size={19} />
            Already Joined
          </>
        ) : (
          <>
            <Users size={19} />
            Join Event
          </>
        )}
      </button>

      {joined && (
        <p className="mt-3 text-center text-sm text-green-600 dark:text-green-400">
          You&apos;re already participating in this event!
        </p>
      )}
    </aside>
  );
};

export default JoinEventOption;
