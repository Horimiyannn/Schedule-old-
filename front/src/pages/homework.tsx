import React from 'react';
import { scheduleData } from '../components/ScheduleData';
import HomeworkTask from '../components/Homework';


const Homework: React.FC = () => {
    return (
    <div>
        <div className="top-bar">
            <h1 className='top-bar-text'>Домашнє завдання</h1>
            <div className='top-bar-buttons'>
                <button className='edit-button'>Показати всі завдання</button>
                <button className='edit-button'>Показати тільки невиконані завдання</button>
            </div>
        </div>
            <div className='homework-container'>
                {scheduleData.map((item, index) => (
                    <div>
                    <HomeworkTask key={index} day={item.day} lessons={item.lessons}/>
                    
                    </div>
                ))}
            </div>

            {/* це ніхуя не буде шаблон, тут буде все дз на тиждень. виконане і ні */}
            {/* це буде шаблон сторінки дз на кожен урок. при переході з головної сторінки буде відкрита сторінка /homework/lesson.
            вона буде оновлюватись кожну неділю, але мати історію */}
    </div>
   
    );
}
export default Homework;