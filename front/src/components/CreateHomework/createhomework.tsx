import axios from "axios";
import { useState } from "react";

interface CreateHomeworkProps {
  fetchHomework: () => void;
  lessonNames: LessonName[];
}

export interface LessonName{
  name: string;
  id: string;
}

const CreateHomework = ({
  fetchHomework,
  lessonNames,
}: CreateHomeworkProps) => {
  const [newHomework, setnewHomework] = useState({
    task: "",
    lid: "",
    deadline: "",
  });
  const addNewLesson = async () => {
    await axios.post("http://localhost:3000/createhomework", newHomework, {
      withCredentials: true,
    });
    fetchHomework();
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lsncrt-dd">
      <button className="top-bar-btn" onClick={() => setIsOpen(!isOpen)}>
        Додати домашнє завдання
      </button>
      {isOpen && (
        <div className="lesson-create-container">
          <label>Назва уроку</label>
          <select className="lesson-name-select" value={newHomework.lid} onChange={(e) =>setnewHomework({...newHomework, lid:e.target.value})}>
            <option disabled value="">Вибрати урок</option>
              {lessonNames.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.name}
                </option>
              ))}
          </select>
          <label>Завдання</label>
          <input
            className="crtlsn-input"
            value={newHomework.task}
            onChange={(e) =>
              setnewHomework({ ...newHomework, task: e.target.value })
            }
          />
          <label>Час</label>
          <input
            className="crtlsn-input"
            value={newHomework.deadline}
            onChange={(e) =>
              setnewHomework({ ...newHomework, deadline: e.target.value })
            }
          />
          <button className="btn-1" onClick={addNewLesson}>
            Додати
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateHomework;
