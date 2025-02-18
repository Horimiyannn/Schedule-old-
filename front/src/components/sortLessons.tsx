export interface Lesson {
    id: string;
    name: string;
    link: string;
    times: { id: string; time: string; lessonId: string; }[];
    userId: string;
    notes: string | null;
  }
  
  interface SortedLessons {
    [day: string]: Lesson[];
  }
  
  export const sortLessonsByDayAndTime = (lessons: Lesson[]): SortedLessons => {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const sortedLessons: SortedLessons = {};
  
    lessons.forEach((lesson) => {
      lesson.times.forEach((time) => {
        const [day, lessonTime] = time.time.split(' ');
        if (!sortedLessons[day]) {
          sortedLessons[day] = [];
        }
        sortedLessons[day].push({ ...lesson, times: [{ ...time, time: lessonTime }] });
      });
    });
  
    daysOfWeek.forEach((day) => {
      if (sortedLessons[day]) {
        sortedLessons[day].sort((a, b) => {
          const timeA = a.times[0].time;
          const timeB = b.times[0].time;
          return timeA.localeCompare(timeB);
        });
      }
    });
  
    return sortedLessons;
  };