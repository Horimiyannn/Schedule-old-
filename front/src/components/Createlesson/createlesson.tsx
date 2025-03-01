import axios from "axios";
import { useState } from "react";
import "./createlesson.css";
import "../../pages/SchedulePage/schedulepage.css";

const CreateLesson = () => {
  const [newLesson, setnewLesson] = useState({ name: "", link: "", time: "" });

  const addNewLesson = async () => {
    await axios.post("http://localhost:3000/createlesson", newLesson, {
      withCredentials: true,
    });
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lsncrt-dd">
      <button className="top-bar-btn" onClick={() => setIsOpen(!isOpen)}>
        Створити новий урок
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
