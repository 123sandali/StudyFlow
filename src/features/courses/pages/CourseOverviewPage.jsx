import { useOutletContext } from 'react-router';

export default function CourseOverviewPage() {
  const { course } = useOutletContext();

  return (
    <article className="courseNestedCard">
      <h2>Course overview</h2>

      <p>{course.description}</p>

      <div className="courseOverviewStats">
        <div>
          <strong>{course.progress}%</strong>
          <span>Progress</span>
        </div>

        <div>
          <strong>{course.tasks.length}</strong>
          <span>Tasks</span>
        </div>

        <div>
          <strong>{course.notes.length}</strong>
          <span>Notes</span>
        </div>
      </div>
    </article>
  );
}