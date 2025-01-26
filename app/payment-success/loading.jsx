import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Loader2 className="h-8 w-8 animate-spin text-gray-500 mb-4" />
      <p className="text-lg text-gray-600">
        Processing Payment... Please wait.
      </p>
    </div>
  );
}
