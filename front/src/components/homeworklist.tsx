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
      
    </div>
  );
};

export default HomeworkList;