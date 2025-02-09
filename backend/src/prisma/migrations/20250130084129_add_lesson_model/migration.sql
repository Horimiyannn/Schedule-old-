-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "active_homework" TEXT NOT NULL,
    "completed_homework" TEXT NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_name_key" ON "Lesson"("name");
