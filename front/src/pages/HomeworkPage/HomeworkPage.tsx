import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/sidebar";
import CreateHomework, { LessonName } from "../../components/CreateHomework/createhomework";
import "./homeworkpage.css";

interface Homework {
  id: string;
  task: string;
  lessonId: string;
  deadline: string;
  lesson: Name;
}

interface Name {
  name: string;
}

const HomeworkPage: React.FC = () => {
  const [homework, setHomework] = useState<Record<string, Homework[]>>({});
  const nav = useNavigate();
  const [lessonNames, setLessonNames] = useState<LessonName[]>([])

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/me", {
          withCredentials: true,
        });
        if (response.data.authStatus === false) {
          nav("/auth");
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkStatus();
  }, [nav]);

  const fetchHomework = async () => {
    try {
      const response = await axios.get("http://localhost:3000/homework/gethomework", {
        withCredentials: true,
      });
      setHomework(response.data.homework);
      setLessonNames(response.data.lessonNames)
    } catch (error) {
      console.error(error);
    }
  };
 

  useEffect(() => {
    fetchHomework();
  }, []);

  return (
    <div className="mainpage">
      <Sidebar />
      <div className="content">
        <div className="top-bar">
          <h1>Домашнє завдання</h1>
          <div className="top-bar-btns">
            <CreateHomework fetchHomework={fetchHomework} lessonNames={lessonNames} />
          </div>
        </div>
        <div className="homework-container">
          {Object.values(homework)
            .flat()
            .map((hw) => (
              <div key={hw.id} className="homework">
                <div className="hw-header">
                  <div className="hw-lesson-name">{hw.lesson.name}</div>
                  <div className="hw-deadline">Потрібно зробити до: {hw.deadline}</div>
                </div>
                <div className="hw-task">{hw.task}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeworkPage;
