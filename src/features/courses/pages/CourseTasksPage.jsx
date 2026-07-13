import { useOutletContext } from 'react-router';

export default function CourseTasksPage() {
  const { course } = useOutletContext();

  return (
    <article className="courseNestedCard">
      <h2>{course.title} tasks</h2>

      {course.tasks.length === 0 ? (
        <p>No tasks are available.</p>
      ) : (
        <ul className="courseNestedList">
          {course.tasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      )}
    </article>
  );
}