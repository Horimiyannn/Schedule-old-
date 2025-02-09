/*
  Warnings:

  - The primary key for the `Lesson` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `Lesson` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGINT NOT NULL;
