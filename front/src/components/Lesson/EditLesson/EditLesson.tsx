import axios from "axios";
import { useState } from "react";
import { lesson } from "../../../types/LessonType";

interface props {
  fetchLessons: () => void;
  lesson: lesson;
}

const EditLesson = ({ fetchLessons, lesson }: props) => {
  const [editlesson, setEditLesson] = useState(lesson);
  const [isOpen, setIsOpen] = useState(false);
  console.log(editlesson);

  const EditLessons = async () => {
    try {
      await axios.patch("http://localhost:3000/lesson/editlesson", editlesson, {
        withCredentials: true,
      });
      fetchLessons();
    } catch (error) {
      console.error(error);
    }
    setIsOpen(false);
  };

  return (
    <div className="lsncrt-dd">
      <button className="deletebutton" onClick={() => setIsOpen(!isOpen)}>
        Редагувати урок
      </button>
      {isOpen && (
        <div className="lesson-create-container">
          <input
            type="text"
            className="crtlsn-input"
            value={editlesson.name}
            onChange={(e) => {
              setEditLesson({ ...editlesson, name: e.target.value });
            }}
          />
          <input
            type="text"
            className="crtlsn-input"
            value={editlesson.link}
            onChange={(e) => {
              setEditLesson({ ...editlesson, link: e.target.value });
            }}
          />
          {editlesson.times?.map((t, index) => (
            <input
              type="text"              
              value={t.time}
              onChange={(e) => {
                const newTimes = [...editlesson.times]
                newTimes[index] = {...t, time: e.target.value}
                setEditLesson({ ...editlesson, times:newTimes });
              }}
            />
          ))}
          <button className="btn-1" onClick={EditLessons}>Змінити</button>
        </div>
      )}
    </div>
  );
};

export default EditLesson;
