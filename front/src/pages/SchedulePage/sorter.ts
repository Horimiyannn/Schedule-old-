interface Lesson {
  time: string;
  DOW: number[];
  id: string;
  name: string;
  link: string;
}

interface SortedLessons {
  [day: string]: Lesson[];
}

const daysOfWeek = [
  "Понеділок",
  "Вівторок",
  "Середа",
  "Четвер",
  "П'ятниця",
  "Субота",
];

export const sortLessonsByDay = (lessons: Lesson[]): SortedLessons => {
  const sortedLessons: SortedLessons = {};

  daysOfWeek.forEach((day) => {
    sortedLessons[day] = []
  })

  lessons.forEach((lesson) => {
    lesson.DOW.forEach((dayNumber) => {
      const dayName = daysOfWeek[dayNumber - 1];
      sortedLessons[dayName].push(lesson);
    });
  });

  Object.keys(sortedLessons).forEach((day) => {
    sortedLessons[day].sort((a, b) => a.time.localeCompare(b.time));
  });

  return sortedLessons;
};
