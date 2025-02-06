"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";

export default function AccountAvatar() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  if (!isLoaded || !user) return null;

  const handleSignOut = async () => {
    try {
      // First navigate to home page
      router.push("/");
      // Then perform sign out
      await signOut();
      // Force a hard refresh of the page to clear any cached states
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getDisplayName = () => {
    if (!user) return "";
    if (user.fullName) return user.fullName;
    if (user.firstName && user.lastName)
      return `${user.firstName} ${user.lastName}`;
    if (user.firstName) return user.firstName;
    if (user.lastName) return user.lastName;
    if (user.emailAddresses && user.emailAddresses[0]) {
      return user.emailAddresses[0].emailAddress.split("@")[0];
    }
    return "User";
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
          <span className="text-[16px] font-[600] text-second">
            {getDisplayName()}
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
