-- CreateEnum
CREATE TYPE "FailedJobStatus" AS ENUM ('PENDING', 'RETRYING', 'RESOLVED', 'ABANDONED');

-- CreateTable
CREATE TABLE "FailedJob" (
    "id" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "error" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 3,
    "status" "FailedJobStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "retriedAt" TIMESTAMP(3),
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "FailedJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FailedJob_status_idx" ON "FailedJob"("status");

-- CreateIndex
CREATE INDEX "FailedJob_jobType_idx" ON "FailedJob"("jobType");

-- CreateIndex
CREATE INDEX "FailedJob_createdAt_idx" ON "FailedJob"("createdAt");
