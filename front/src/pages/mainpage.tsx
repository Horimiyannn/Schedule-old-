import React from 'react';
import ScheduleDay from '../components/ScheduleDay';
import { scheduleData } from '../components/ScheduleData';
import Notifications from '../components/notifications';
import Homeworklist from '../components/homeworklist';
// import { trpc } from '../lib/trpc'


const Main: React.FC = () => {
    return (
        <div>
            <div className='top-bar'>
                <h1 className='top-bar-text'>Розклад занять</h1>  
                <div className='top-bar-buttons'>
                    <button className='edit-button'>Редагувати</button>
                    <button className='edit-button'>Import</button> 
                    <button className='edit-button'>Export</button> 
                    <Notifications/>
                </div>    
            </div>
            <div className='schedule-container'>                          
                {scheduleData.map((item, index) => (
                    <ScheduleDay key={index} day={item.day} lessons={item.lessons} />
                ))}
            </div>
            <Homeworklist/>
        </div>

        // останні 5 не виконанних дз
    );
}

export default Main;