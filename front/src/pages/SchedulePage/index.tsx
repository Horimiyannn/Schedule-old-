import { Sidebar } from "../../components/Sidebar/sidebar.tsx";
import { trpc } from "../../lib/trpc.tsx";
import { sortLessonsByDay } from "./sorter.ts";
import "./index.css";

export const MainPage = () => {
  const { data, error, isLoading, isFetching, isError } =
    trpc.getSchedule.useQuery();

  if (isLoading || isFetching) {
    return <span>loading</span>;
  }

  if (isError) {
    return <span>{error.message}</span>;
  }

  const sortedLessons = sortLessonsByDay(data.lessons);

  return (
    <div className="mainpage">
      <div>
        <Sidebar />
      </div>
      <div className="content">
        <div>
          <h1>Головна</h1>
        </div>
        <div className="schedule">
          {Object.keys(sortedLessons).map((day) => (
            <div key={day} className="schedule-day">
              <h2>{day}</h2>
              {sortedLessons[day].map((lesson) => (
                <div key={lesson.id} className="schedule-list">
                  <span className="lesson-time">{lesson.time}</span>
                  <a
                    href={lesson.link}
                    className="lesson-name"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {lesson.name}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
