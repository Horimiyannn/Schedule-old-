import React from 'react';


interface Lesson {
    name: string;
    link: string;
    time: string;
    homework: string
    notes: string
}

interface ScheduleDayProps {
    day: string;
    lessons: Lesson[];
}

const ScheduleDay: React.FC<ScheduleDayProps> = ({ day, lessons }) => {
    return (
        <div className="schedule-day">
            <h2>{day}</h2>
            <ul className="schedule-list">
                {lessons.map((lesson, index) => (
                    <li key={index} className="schedule-item">
                        <span className="lesson-time">{lesson.time}</span>
                        <a href={lesson.link} className="lesson-name" target="_blank" rel="noopener noreferrer">{lesson.name}</a>
                        <a href={lesson.notes} className='lesson-hw'>Нотатки</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ScheduleDay;