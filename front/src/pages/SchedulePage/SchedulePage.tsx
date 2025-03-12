import CreateLesson from "../../components/CreateLesson/createlesson.tsx";
import { Sidebar } from "../../components/Sidebar/sidebar.tsx";
import "./schedulepage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Day } from "../../types/LessonType.ts";

const Mainpage: React.FC = () => {
  const [lessons, setLessons] = useState<Day[]>([]);
  const [redIsOpen, setRedIsOpen] = useState(false);
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/me", {
          withCredentials: true,
        });
        console.log(response.data.authStatus);
        if (response.data.authStatus === false) {
          window.location.replace("/auth");
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkStatus();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/lesson/getlessons",
        {
          withCredentials: true,
        }
      );
      setLessons(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <div className="mainpage">
      <Sidebar />
      <div className="content">
        <div className="top-bar">
          <h1>Головна</h1>
          <div className="top-bar-btns">
            <CreateLesson fetchLessons={fetchLessons} />
            <button
              className="top-bar-btn"
              onClick={() => setRedIsOpen(!redIsOpen)}
            >
              Редагувати
            </button>
          </div>
        </div>
        <div className="schedule">
          {lessons.map((day) => (
            <div key={day.id} className="schedule-day">
              <div className="day-name">{day.name}</div>
              <div className="day-lessons">
                {day.lessons.map((lesson) => {
                  const deleteLesson = async () => {
                    try {
                      console.log(lesson.id);
                      await axios.post(
                        "http://localhost:3000/lesson/deletelesson",{data:lesson.id},{withCredentials: true}
                      );
                      fetchLessons()
                    } catch (error) {
                      console.error(error);
                    }
                  };
                  return (
                    <div key={lesson.id} className="lesson">
                      <div className="lesson-time">{lesson.time}</div>
                      <a
                        href={lesson.link}
                        target="_blank"
                        className="lesson-name"
                      >
                        {lesson.name}
                      </a>

                      {redIsOpen && (
                        <button
                          className="deletebutton"
                          onClick={() => deleteLesson()}
                        >
                          X
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
