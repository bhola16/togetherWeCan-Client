"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const RetryButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRetry = () => {
    setIsLoading(true);
    router.refresh();
  };

  return (
    <Button
      type="button"
      onClick={handleRetry}
      disabled={isLoading}
      className="mt-6 rounded-xl border bg-green-600 px-8 py-5 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70">
      <RefreshCw
        className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
      />
      {isLoading ? "Retrying..." : "Try Again"}
    </Button>
  );
};

export default RetryButton;
