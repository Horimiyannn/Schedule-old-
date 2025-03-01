import CreateLesson from "../../components/Createlesson/createlesson.tsx";
import { Sidebar } from "../../components/Sidebar/sidebar.tsx";
import "./schedulepage.css";
import axios from "axios";
import { useEffect, useState } from "react";
// import Day from "./scheduleday.tsx";
interface Lesson {
  id: string;
  name: string;
  link: string;
  time: string;
}

const weekDays = [
  "Понеділок",
  "Вівторок",
  "Середа",
  "Четвер",
  "П'ятниця",
  "Субота",
];

const Mainpage: React.FC = () => {
  const [lessons, setLessons] = useState<Record<string, Lesson[]>>({});

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
  }, []);

  return (
    <div className="mainpage">
      <Sidebar />
      <div className="content">
        <div className="top-bar">
          <h1>Головна</h1>
          <div className="top-bar-btns">
            <CreateLesson/>
          </div>
        </div>
        <div className="schedule">
          {weekDays.map((day) => (
            <div key={day} className="schedule-day">
              <h2>{day}</h2>
              {lessons[day]?.length ? (
                lessons[day].map((lesson) => (
                  <div key={lesson.id} className="lesson">
                    <span className="lesson-time">{lesson.time}</span>
                    <a
                      href={lesson.link}
                      className="lesson-name"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {lesson.name}
                    </a>
                  </div>
                ))
              ) : (
                <p>Немає занять</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
