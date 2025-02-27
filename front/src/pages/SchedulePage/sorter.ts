interface Lesson {
  time: string[];
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
    lesson.time.forEach((days) => {
      const [day,time] = days.split(" ");
      if (daysOfWeek.includes(day)){
        sortedLessons[day].push({...lesson, time:[time]})
      }
    });
  });

  Object.keys(sortedLessons).forEach((day) => {
    sortedLessons[day].sort((a, b) => a.time[0].localeCompare(b.time[0]));
  });

  return sortedLessons;
};
