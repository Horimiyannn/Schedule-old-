import React from "react";
import "./Day.css";
import { Props } from "../../types/LessonType";



const Day = (props: Props) => {
  return (
    <div className="day-container">
      <div className="day-name">{props.day.name}</div>
      {props.day.lessons.map((lesson) => {
        return (
          <div key={lesson.id} className="lesson">
            <div>{lesson.time}</div>
            <div>{lesson.name}</div>
            <div>{lesson.link}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Day;
