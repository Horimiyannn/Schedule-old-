import React from 'react';


interface Lesson {
    name: string;
    link: string;
    time: string;
    homework: string
    task: string
    
}

interface HomeworkProps {
    day: string;
    lessons: Lesson[];
}

const HomeworkTask: React.FC<HomeworkProps> = ({ day, lessons }) => {
    return (
        <div className="schedule-day">
            <h2>{day}</h2>
            <ul className="schedule-list">
                {lessons
                .filter((lesson) => lesson.task !== '')
                .map((lesson, index) => (
                    <div className='homework-item'>
                        <li key={index} className="schedule-item">                           
                            <h3>{lesson.name}</h3>
                        </li>
                        <div key={index} className="homework-task">
                            <p>{lesson.task}</p>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default HomeworkTask;