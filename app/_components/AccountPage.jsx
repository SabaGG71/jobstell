"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AccountNavigation() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSignUp = () => {
    router.push("/sign-up");
  };

  // Show loading state or nothing while checking auth state
  if (!isLoaded) return null;

  // If user is logged in, show avatar and sign out button
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
