/*
  Warnings:

  - You are about to drop the column `CompleteStatus` on the `Homework` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Homework" DROP COLUMN "CompleteStatus",
ADD COLUMN     "completeStatus" BOOLEAN NOT NULL DEFAULT false;
