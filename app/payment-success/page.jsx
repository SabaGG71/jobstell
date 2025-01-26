"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { db } from "@/utils/db";
import { USER_TABLE } from "@/utils/schema";
import { eq, sql } from "drizzle-orm";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const updateTokens = async () => {
      const email = searchParams.get("email");

      if (email) {
        await db
          .update(USER_TABLE)
          .set({ tokens: sql`tokens + 50` })
          .where(eq(USER_TABLE.email, email));

        // Redirect to dashboard after updating tokens
        router.push("/dashboard");
      }
    };

    updateTokens();
  }, [searchParams, router]);

  return <div>Processing Payment... Please wait.</div>;
}
