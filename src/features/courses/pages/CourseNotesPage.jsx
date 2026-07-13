import { useOutletContext } from 'react-router';

export default function CourseNotesPage() {
  const { course } = useOutletContext();

  return (
    <article className="courseNestedCard">
      <h2>{course.title} notes</h2>

      {course.notes.length === 0 ? (
        <p>No notes are available.</p>
      ) : (
        <ul className="courseNestedList">
          {course.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}
    </article>
  );
}