// import React from "react";

// interface Lesson {
//   name: string;
//   link: string;
//   time: string;
//   homework: string;
//   notes: string;
// }

// interface ScheduleDayProps {
//   day: string;
//   lessons: Lesson[];
// }

// const ScheduleDay: React.FC<ScheduleDayProps> = ({ day, lessons }) => {
//   return (
//     <div className="schedule-day">
//       <h2>{day}</h2>
//       <ul className="schedule-list">
//         {lessons.map((lesson, index) => (
//           <li key={index} className="schedule-item">
//             <span className="lesson-time">{lesson.time}</span>
//             <a
//               href={lesson.link}
//               className="lesson-name"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               {lesson.name}
//             </a>
//             <a href={lesson.notes} className="lesson-hw">
//               Нотатки
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ScheduleDay;


import React from 'react';

interface Lesson {
  id: string;
  name: string;
  link: string;
  times: { id: string; time: string; lessonId: string; }[];
  userId: string;
  notes: string | null;
}

interface ScheduleDayProps {
  day: string;
  lessons: Lesson[];
}

const ScheduleDay: React.FC<ScheduleDayProps> = ({ day, lessons }) => {
  // Sort lessons by time
  const sortedLessons = lessons.sort((a, b) => {
    const timeA = a.times.length > 0 ? a.times[0].time : '';
    const timeB = b.times.length > 0 ? b.times[0].time : '';
    return timeA.localeCompare(timeB);
  });

  return (
    <div className="schedule-day">
      <h2>{day}</h2>
      <ul className="schedule-list">
        {sortedLessons.map((lesson) => (
          <li key={lesson.id}>
            <span className="lesson-time">
              {lesson.times.map((time) => (
                <span key={time.id}>{time.time}</span>
              ))}
            </span>
            <b>{lesson.name}</b> - <a href={lesson.link}>{lesson.link}</a>
            <ul>
              {lesson.times.map((time) => (
                <li key={time.id}>{time.time}</li>
              ))}
            </ul>
            {lesson.notes && <p>Notes: {lesson.notes}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleDay;