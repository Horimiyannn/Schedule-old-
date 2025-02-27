import "./index.css";

const Day = () => {
  return (
    <div className="schedule-day">
      <h1 className="day-name">Day name</h1>
      <div className="day-lessons">
        <div className="lesson">
          <div className="lesson-time">10:00</div>
          <div className="lesson-name">lesson name</div>
          <div className="lesson-notes">notes</div>
        </div>
      </div>
    </div>
  );
};

export default Day;
