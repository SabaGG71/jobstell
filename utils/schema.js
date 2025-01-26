import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

export const JobInterview = pgTable("JobInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("JobPosition").notNull(),
  jobDescription: varchar("jobDescription").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  customerId: varchar(),
  createdAt: varchar("createdAt").notNull(),
  mockJobId: varchar("mockJobId").notNull(),
  status: varchar("status").default("ACTIVE"),
});

export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockJobId").notNull(),
  question: varchar("question").notNull(),
  correctAns: text("correctAns"),
  userAns: text("userAns").notNull(),
  feedback: text("feedback"),
  rating: varchar("rating"),
  customerId: varchar(),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
});

export const USER_TABLE = pgTable("users", {
  id: serial().primaryKey(),
  name: varchar(),
  email: varchar(),
  customerId: varchar(),
  tokens: integer().default(0),
});

export const PAYMENT_RECORD_TABLE = pgTable("paymentRecord", {
  id: serial().primaryKey(),
  customerId: varchar(),
  sessionId: varchar(),
});
