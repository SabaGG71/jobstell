"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { JobInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

export default function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPostion, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState();
  const router = useRouter();
  const { user } = useUser();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPostion, jobDesc, jobExperience);

    const inputPrompt =
      "Job Position: " +
      jobPostion +
      ", Job Description: " +
      jobDesc +
      ", Years of experience: " +
      jobExperience +
      ", depends on job position, job description and years of experience, give me " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      " interview questions along with answers in JSON format, give me question and answer field on JSON";

    const result = await chatSession.sendMessage(inputPrompt);
    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(JSON.parse(mockJsonResp));
    setJsonResponse(mockJsonResp);

    if (mockJsonResp) {
      const resp = await db
        .insert(JobInterview)
        .values({
          mockJobId: uuidv4(),
          jsonMockResp: mockJsonResp,
          jobPosition: jobPostion,
          jobDescription: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockJobId: JobInterview.mockJobId });

      if (resp) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + resp[0]?.mockJobId);
      }
      console.log("Inserted ID: ", resp);
    } else {
      console.log("ERROR");
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border hover:bg-secondary-200 text-center bg-secondary-100 duration-200 cursor-pointer rounded-lg"
        onClick={() => setOpenDialog(!openDialog)}
      >
        <h2 className="font-bold text-lg">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              <span className="text-2xl font-bold block">
                Tell Us More about your job interview
              </span>
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <p className="text-secondary-500">
                Add Details About Your Job Position/Role, Job Description and
                years of experience
              </p>

              <div className="mt-5">
                <label className="block mb-2">Job Role/Job Position 💼</label>
                <Select
                  value={jobPostion}
                  onValueChange={setJobPosition}
                  required
                  name="jobPosition"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web developer">Web Developer</SelectItem>
                    <SelectItem value="Data Scientist">
                      Data Scientist
                    </SelectItem>
                    <SelectItem value="Cloud Engineer">
                      Cloud Engineer
                    </SelectItem>
                    <SelectItem value="UI/UX Designer">
                      UI/UX Designer
                    </SelectItem>
                    <SelectItem value="Blockchain Developer">
                      Blockchain Developer
                    </SelectItem>
                    <SelectItem value="Cybersecurity Specialist">
                      Cybersecurity Specialist
                    </SelectItem>
                    <SelectItem value="Business & Management">
                      Business & Management
                    </SelectItem>
                    <SelectItem value="Healthcare & Medicine">
                      Healthcare & Medicine
                    </SelectItem>
                    <SelectItem value="Education & Training">
                      Education & Training
                    </SelectItem>
                    <SelectItem value="other">Other...</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block mb-2">
                👉 Job Description / Tech Stack (In Short)
              </label>
              <Textarea
                required
                placeholder="Ex. React, Angular, NodeJS, MySql etc"
                className="max-h-[200px]"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2">Years Of experience</label>
              <Input
                required
                type="number"
                min="0"
                max="60"
                placeholder="Ex. 5"
                value={jobExperience}
                onChange={(e) => setJobExperience(Number(e.target.value))}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin mr-1" /> Generating
                    from AI
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
