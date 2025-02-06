"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { db } from "../../utils/db";
import { USER_TABLE } from "../../utils/schema";
import { eq, sql } from "drizzle-orm";
import { Loader2 } from "lucide-react";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    const updateTokens = async () => {
      try {
        const email = searchParams.get("email");

        if (!email) {
          setError("No email provided");
          return;
        }

        await db
          .update(USER_TABLE)
          .set({ tokens: sql`tokens + 50` })
          .where(eq(USER_TABLE.email, email));

        // Add a small delay before redirect to ensure DB update completes
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } catch (err) {
        console.error("Error updating tokens:", err);
        setError("Failed to process payment. Please contact support.");
      }
    };

    updateTokens();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Loader2 className="h-8 w-8 animate-spin text-gray-500 mb-4" />
      <p className="text-lg text-gray-600">
        Processing Payment... Please wait.
      </p>
    </div>
  );
}
