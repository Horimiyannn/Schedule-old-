import { Sidebar } from "../../components/Sidebar/sidebar.tsx";

// import { sortLessonsByDay } from "./sorter.ts";
import "./index.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Day from "./scheduleday.tsx";

const MainPage = () => {
  interface Lessons {
    time: string;
    id: string;
    name: string;
    link: string;
  }

  const [lessons, setLessons] = useState<Lessons[]>([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get("http://localhost:3000/lessons", {
          withCredentials: true,
        });
        setLessons(response.data);
      } catch (error) {
        console.error("Помилка:", error);
      }
    };
    fetchLessons();
  });

  // const sortedLessons = sortLessonsByDay(lessons);

  //   return (
  //     <div className="mainpage">
  //       <div>
  //         <Sidebar />
  //       </div>
  //       <div className="content">
  //         <div>
  //           <h1>Головна</h1>
  //         </div>
  //         <div className="schedule">
  //           {Object.keys(lessons).map((day) => (
  //             <div key={day} className="schedule-day">
  //               <h2>{day}</h2>
  //               {lessons.map((lesson) => (
  //                 <div key={lesson.id} className="schedule-list">
  //                   <span className="lesson-time">{lesson.time}</span>
  //                   <a
  //                     href={lesson.link}
  //                     className="lesson-name"
  //                     target="_blank"
  //                     rel="noopener noreferrer"
  //                   >
  //                     {lesson.name}
  //                   </a>
  //                 </div>
  //               ))}
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
  return (
    <div className="mainpage">
      <Sidebar />
      <div className="content">
        <div className="top-bar">
          <h1>Головна</h1>
        </div>
        <div className="schedule">
          <Day />
          <Day />
          <Day />
          <Day />
          <Day />
          <Day />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
