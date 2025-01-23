import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const JobInterview = pgTable("JobInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("JobPosition").notNull(),
  jobDescription: varchar("jobDescription").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
  mockJobId: varchar("mockJobId").notNull(),
});
