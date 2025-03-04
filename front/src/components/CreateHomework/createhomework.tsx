import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'


interface CreateHomeworkProps {
  fetchHomework: () => void;
  lessonNames: LessonName[];
}

export interface LessonName {
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
    deadline: null as Date | null,
  });
  console.log(newHomework.deadline);
  const addNewLesson = async () => {
    await axios.post("http://localhost:3000/homework/createhomework", newHomework, {
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
          <select
            className="lesson-name-select"
            value={newHomework.lid}
            onChange={(e) =>
              setnewHomework({ ...newHomework, lid: e.target.value })
            }
          >
            <option disabled value="">
              Вибрати урок
            </option>
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

          <DatePicker
            
            selected={newHomework.deadline}
            onChange={(date) =>
              setnewHomework({ ...newHomework, deadline: date })
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
