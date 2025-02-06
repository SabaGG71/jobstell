import { Button } from "../../components/ui/button";
import Link from "next/link";

export default function InterviewItemCard({ interview }) {
  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-xl text-primary-800">
        {interview?.jobPosition}
      </h2>
      <p className="my-1 mb-3 text-sm text-secondary-600">
        Experience: {interview?.jobExperience}
      </p>
      <h2 className="bg-primary-100 inline-block py-1 px-5 rounded-lg">
        Created At: {interview?.createdAt}
      </h2>
      <div className="flex mt-4 justify-between items-center gap-2">
        <Link href={`/dashboard/interview/${interview?.mockJobId}/feedback`}>
          <Button size="sm" className="w-full" variant="outline">
            Feedback
          </Button>
        </Link>
      </div>
    </div>
  );
}
