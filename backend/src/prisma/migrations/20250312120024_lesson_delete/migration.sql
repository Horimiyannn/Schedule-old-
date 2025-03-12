-- DropForeignKey
ALTER TABLE "Homework" DROP CONSTRAINT "Homework_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "LessonTime" DROP CONSTRAINT "LessonTime_lessonId_fkey";

-- AddForeignKey
ALTER TABLE "LessonTime" ADD CONSTRAINT "LessonTime_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Homework" ADD CONSTRAINT "Homework_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
