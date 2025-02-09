/*
  Warnings:

  - Changed the type of `deadline` on the `Homework` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'admin');

-- AlterTable
ALTER TABLE "Homework" DROP COLUMN "deadline",
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" ALTER COLUMN "notes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'student';
