import axios from "axios";
import { useState } from "react";
import "./createlesson.css";
import "../../../pages/SchedulePage/schedulepage.css";

interface CreateLessonProps {
  fetchLessons: () => void;
}

const CreateLesson = ({ fetchLessons }: CreateLessonProps)  => {
  const [newLesson, setnewLesson] = useState({ name: "", link: "", time: "" });
  const [isOpen, setIsOpen] = useState(false);

  const addNewLesson = async () => {
    try {
      await axios.post("http://localhost:3000/lesson/createlesson", newLesson, {
        withCredentials: true,
      });
      fetchLessons();
    } catch (error) {
      console.error(error);
    }
    setnewLesson({ name: "", link: "", time: "" })
    setIsOpen(false)
  };

  return (
    <div className="lsncrt-dd">
      <button className="top-bar-btn" onClick={() => setIsOpen(!isOpen)}>
        Новий урок
      </button>
      {isOpen && (
        <div className="lesson-create-container">
          <label>Назва уроку</label>
          <input
            className="crtlsn-input"
            value={newLesson.name}
            onChange={(e) =>
              setnewLesson({ ...newLesson, name: e.target.value })
            }
            
          />
          <label>Посилання на урок</label>
          <input
            className="crtlsn-input"
            value={newLesson.link}
            onChange={(e) =>
              setnewLesson({ ...newLesson, link: e.target.value })
            }
          />
          <label>Час</label>
          <input
            className="crtlsn-input"
            value={newLesson.time}
            onChange={(e) =>
              setnewLesson({ ...newLesson, time: e.target.value })
            }
          />
          <button className="btn-1" onClick={addNewLesson}>
            Створити
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateLesson;
