import React, {useState, useEffect} from 'react';
import ScheduleDay from '../components/ScheduleDay';
// import { scheduleData } from '../components/ScheduleData';
import AddLesson from '../components/addLesson';
import Notifications from '../components/notifications';
import Homeworklist from '../components/homeworklist';
import { sortLessonsByDayAndTime, Lesson } from '../components/sortLessons';

import { trpc } from '../lib/trpc'


const Main: React.FC = () => {
    const [sortedLessons, setSortedLessons] = useState<{ [day: string]: Lesson[] }>({});
    const token = localStorage.getItem('token') || '';
  
    const { data: lessons, isLoading, error } = trpc.getUserSchedule.useQuery({ token }, {
      enabled: !!token,
    });
  
    useEffect(() => {
      if (lessons) {
        setSortedLessons(sortLessonsByDayAndTime(lessons));
      }
    }, [lessons]);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    return (
      <div>
        <div className='top-bar'>
          <h1 className='top-bar-text'>Розклад занять</h1>
          <div className='top-bar-buttons'>
            <button className='edit-button'>Редагувати</button>
            <button className='edit-button'>Import</button>
            <button className='edit-button'>Export</button>
            <AddLesson />
            <Notifications />
          </div>
        </div>
        <div className='schedule-container'>
          {Object.keys(sortedLessons).map((day) => (
            <ScheduleDay key={day} day={day} lessons={sortedLessons[day]} />
          ))}
        </div>
        <Homeworklist />
      </div>
    );
  };
  
  export default Main;