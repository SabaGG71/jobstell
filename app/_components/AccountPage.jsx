"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AccountAvatar() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  if (!isLoaded || !user) return null;

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to home page after successful sign out
      router.push("/");
      // Force a router refresh to ensure all auth states are updated
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-background shadow-md rounded-md">
      <div className="flex flex-col">
        <div className="flex gap-3 items-center">
          <Avatar className="h-8 w-8 border-2 hover:scale-105 duration-300 transition-all cursor-pointer border-primary-200">
            <AvatarImage
              src={user.imageUrl}
              alt={user.fullName || "User Avatar"}
            />
            <AvatarFallback className="bg-muted text-muted-foreground">
              {user.firstName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-[15px] font-medium text-foreground">
            {user.fullName}
          </span>
        </div>
        <Button
          variant="outline"
          onClick={handleSignOut}
          className="mt-1 text-[14px]"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
