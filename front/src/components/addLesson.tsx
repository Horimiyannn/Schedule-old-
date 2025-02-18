import React, { useState, useEffect } from "react";
import { trpc } from "../lib/trpc";

const AddLesson: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const toggleAddLesson = () => {
    setIsOpen(!isOpen);
  };

  const { data: session } = trpc.getSession.useQuery();

  useEffect(() => {
    if (session) {
      setUserId(session.userId);
    }
  }, [session]);

  const [newLesson, setNewLesson] = useState({
    name: "",
    link: "",
    times: [""],
    userId: "",
    notes: "",
  });

  const addLessonMutation = trpc.addLesson.useMutation();

  const handleAddLesson = async () => {
    await addLessonMutation.mutateAsync({ ...newLesson, userId });
    setNewLesson({
      name: "",
      link: "",
      times: [""],
      userId: "",
      notes: "",
    });
  };

  return (
    <div className="addLesson-container">
      <button className="addLesson-button" onClick={toggleAddLesson}>
        📖 Добавити новий урок
      </button>
      {isOpen && (
        <div className="addLessonDropdown">
          <input
            type="text"
            placeholder="Name"
            value={newLesson.name}
            onChange={(e) => setNewLesson({ ...newLesson, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Link"
            value={newLesson.link}
            onChange={(e) => setNewLesson({ ...newLesson, link: e.target.value })}
          />
          <input
            type="text"
            placeholder="Time"
            value={newLesson.times.join(", ")}
            onChange={(e) =>
              setNewLesson({ ...newLesson, times: e.target.value.split(", ") })
            }
          />
          <input
            type="text"
            placeholder="Notes"
            value={newLesson.notes}
            onChange={(e) => setNewLesson({ ...newLesson, notes: e.target.value })}
          />
          <button onClick={handleAddLesson}>Add Lesson</button>
        </div>
      )}
    </div>
  );
};

export default AddLesson;