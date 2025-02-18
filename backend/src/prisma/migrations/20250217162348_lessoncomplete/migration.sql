/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `Homework` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Homework" DROP COLUMN "isCompleted";

-- CreateTable
CREATE TABLE "LessonCompleteStatus" (
    "id" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "homeworkId" TEXT NOT NULL,

    CONSTRAINT "LessonCompleteStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LessonCompleteStatus" ADD CONSTRAINT "LessonCompleteStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonCompleteStatus" ADD CONSTRAINT "LessonCompleteStatus_homeworkId_fkey" FOREIGN KEY ("homeworkId") REFERENCES "Homework"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
