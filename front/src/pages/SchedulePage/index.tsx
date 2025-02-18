import { trpc } from "../../lib/trpc.tsx"


export const MainPage = () => {
    const {data, error, isLoading, isFetching, isError } = trpc.getSchedule.useQuery()
    
    if (isLoading) {
        return<span>loading</span>
    }

    if (isError) {
        return <span>{error.message}</span>
    }
    return (
        <div>
            <h1>Schedule</h1>
            {data.lessons.map((lesson) => {
                <li key={lesson.id}>
                    <span className="lesson-time"></span>
                    <b>{lesson.name}</b>
                </li>
            })}
        </div>
        
    )
}