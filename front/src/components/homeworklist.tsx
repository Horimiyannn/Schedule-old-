import React, { useState } from 'react';
import { trpc } from '../lib/trpc';

interface Lesson {
    id: number
    name: string;
    link: string;
    time: string;
    homework: string;
    task: string;
    notes: string;
}


const Homework: React.FC = () => {
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
            {visibleHomework.map((hw: Lesson) => (
                    <li key={hw.id}>
                        <b>{hw.time}</b> - {hw.name}: {hw.task}
                    </li>
                ))}
            </ul>

           
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        style={{
                            margin: '5px',
                            padding: '5px 10px',
                            backgroundColor: currentPage === index + 1 ? '#a73333' : '#3c737a',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Homework;

