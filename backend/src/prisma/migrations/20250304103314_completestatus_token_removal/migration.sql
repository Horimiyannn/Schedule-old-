/*
  Warnings:

  - You are about to drop the column `notes` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the `LessonCompleteStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LessonCompleteStatus" DROP CONSTRAINT "LessonCompleteStatus_homeworkId_fkey";

-- DropForeignKey
ALTER TABLE "LessonCompleteStatus" DROP CONSTRAINT "LessonCompleteStatus_userId_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- AlterTable
ALTER TABLE "Homework" ADD COLUMN     "CompleteStatus" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "notes";

-- DropTable
DROP TABLE "LessonCompleteStatus";

-- DropTable
DROP TABLE "Token";
