import React, { useState } from 'react';
import { trpc } from '../lib/trpc';

// interface Lesson {
//   id: string;
//   name: string;
//   link: string;
//   time: string;
//   notes?: string;
//   userId: string;
// }

const HomeworkList: React.FC = () => {
  const { data: lessons = [], isLoading } = trpc.getLessons.useQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(lessons.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleHomework = lessons.slice(startIndex, startIndex + itemsPerPage);

  const [newLesson, setNewLesson] = useState({
    name: '',
    link: '',
    times: [''],
    userId: 'afbcacfa-170c-4d95-befa-6c3d62b1f823', // You need to set this to a valid user ID
    notes: '',
  });

  const addLessonMutation = trpc.addLesson.useMutation();

  const handleAddLesson = async () => {
    await addLessonMutation.mutateAsync(newLesson);
    setNewLesson({
      name: '',
      link: '',
      times: [''],
      userId: '',
      notes: '',
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Домашні завдання</h2>
      <ul>
        {visibleHomework.map((hw) => (
          <li key={hw.id}>
            <b>{hw.times.map((time) => time.time).join(', ')}</b> - {hw.name}: {hw.notes}
          </li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div>
        <h3>Add New Lesson</h3>
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
          value={newLesson.times.join(', ')}
          onChange={(e) => setNewLesson({ ...newLesson, times: e.target.value.split(', ') })}
        />
        <input
          type="text"
          placeholder="User ID"
          value={newLesson.userId}
          onChange={(e) => setNewLesson({ ...newLesson, userId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Notes"
          value={newLesson.notes}
          onChange={(e) => setNewLesson({ ...newLesson, notes: e.target.value })}
        />
        <button onClick={handleAddLesson}>Add Lesson</button>
      </div>
    </div>
  );
};

export default HomeworkList;