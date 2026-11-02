"use client";

import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenClient";
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
  const [participantCount, setParticipantCount] = useState(0);

  // Check whether the event date has already passed.
  const eventDate = new Date(`${event.eventDate.slice(0, 10)}T00:00:00Z`);

  const today = new Date();

  const todayUTC = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
  );

  const isCompleted = eventDate.getTime() < todayUTC;

  // Fetch the total number of volunteers.
  // This endpoint is public, so JWT is not required.
  useEffect(() => {
    let cancelled = false;

    const getParticipantCount = async () => {
      try {
        const params = new URLSearchParams({
          eventId: event._id,
        });

        const res = await fetch(
          `${API_URL}/eventParticipants/count?${params.toString()}`,
          { cache: "no-store" },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch volunteer count.");
        }

        const data: { count: number } = await res.json();

        if (!cancelled) {
          setParticipantCount(data.count);
        }
      } catch {
        if (!cancelled) {
          toast.error("Unable to load the volunteer count.");
        }
      }
    };

    void getParticipantCount();

    return () => {
      cancelled = true;
    };
  }, [event._id]);

  // Check whether the current authenticated user has already joined.
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
        const {token, error} = await getTokenFromClient();

        if (error ||!token) {
          throw new Error("Authentication failed.");
        }

        const params = new URLSearchParams({
          eventId: event._id,
        });

        const res = await fetch(
          `${API_URL}/eventParticipants/check?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
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
      } catch {
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

  // Refresh volunteer count from MongoDB.
  // This endpoint is public, so JWT is not required.
  const refreshParticipantCount = async () => {
    try {
      const params = new URLSearchParams({
        eventId: event._id,
      });

      const res = await fetch(
        `${API_URL}/eventParticipants/count?${params.toString()}`,
        { cache: "no-store" },
      );

      if (!res.ok) return;

      const data: { count: number } = await res.json();

      setParticipantCount(data.count);
    } catch {
      toast.error("Unable to refresh the volunteer count.");
    }
  };

  // Join or unjoin event.
  const handleParticipation = async () => {
    // Check login before allowing participation.
    if (!user) {
      toast.error("You must be logged in to join this event.");
      // router.push("/login");
      return;
    }

    if (isCompleted) {
      toast.error(
        "This event has already been completed. Participation cannot be changed.",
      );
      return;
    }

    if (loading || checkingParticipation || isPending) return;

    setLoading(true);

    try {
      // Get the authenticated user's JWT.
        const { token, error } = await getTokenFromClient();

      if (error || !token) {
        toast.error("Authentication failed. Please log in again.");
        router.push("/login");
        return;
      }

      if (joined) {
        // Unjoin event.
        const res = await fetch(`${API_URL}/eventParticipants`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            eventId: event._id,
          }),
        });

        const data: { message?: string } = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Failed to leave the event.");
          return;
        }

        setJoined(false);

        // Immediately decrease the volunteer count.
        setParticipantCount((previousCount) => Math.max(0, previousCount - 1));

        toast.success("You have successfully left this event!");
      } else {
        // Join event.
        const participantData = {
          eventId: event._id,
          eventTitle: event.title,
          eventDate: event.eventDate,
          userName: user.name,
          userEmail: user.email,
          userImage: user.image || "",
        };

        const res = await fetch(`${API_URL}/eventParticipants`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(participantData),
        });

        const data: { message?: string } = await res.json();

        if (!res.ok) {
          if (res.status === 409) {
            setJoined(true);
            await refreshParticipantCount();
          }

          toast.error(data.message || "Failed to join the event.");
          return;
        }

        setJoined(true);

        // Immediately increase the volunteer count.
        setParticipantCount((previousCount) => previousCount + 1);

        toast.success("You have successfully joined this event!");
      }
    } catch {
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

      {/* Volunteer Count */}
      <div className="mb-5 flex items-center gap-3 rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
        <Users size={21} className="text-green-700 dark:text-green-400" />

        <div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {participantCount}
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            {participantCount === 1 ? "Volunteer Joined" : "Volunteers Joined"}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleParticipation}
        disabled={loading || checkingParticipation || isPending || isCompleted}
        className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
          isCompleted
            ? "cursor-not-allowed bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
            : joined
              ? "bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700 dark:bg-green-900/40 dark:text-green-400 dark:hover:bg-red-900/40 dark:hover:text-red-400"
              : "bg-green-600 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        }`}>
        {isPending || checkingParticipation ? (
          "Checking..."
        ) : isCompleted ? (
          "Event Completed"
        ) : loading ? (
          joined ? (
            "Leaving..."
          ) : (
            "Joining..."
          )
        ) : joined ? (
          <>
            <CheckCircle2 size={19} />
            Already Joined (Unjoin)
          </>
        ) : (
          <>
            <Users size={19} />
            Join Event
          </>
        )}
      </button>

      {joined && !isCompleted && (
        <p className="mt-3 text-center text-sm text-green-600 dark:text-green-400">
          You&apos;re participating in this event. Click above if you want to
          leave.
        </p>
      )}

      {isCompleted && (
        <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
          This event has ended. Participation changes are no longer allowed.
        </p>
      )}
    </aside>
  );
};

export default JoinEventOption;
