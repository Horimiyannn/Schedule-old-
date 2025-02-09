/*
  Warnings:

  - You are about to drop the column `active_homework` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `completed_homework` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Lesson_name_key";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "active_homework",
DROP COLUMN "completed_homework",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Homework" (
    "id" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "lessonId" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,

    CONSTRAINT "Homework_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HomeworkToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_HomeworkToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "_HomeworkToUser_B_index" ON "_HomeworkToUser"("B");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Homework" ADD CONSTRAINT "Homework_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HomeworkToUser" ADD CONSTRAINT "_HomeworkToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Homework"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HomeworkToUser" ADD CONSTRAINT "_HomeworkToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
