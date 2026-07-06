import '../dashboard.css'

function CourseCard({ code, title, semester }) {
  return (
    <article className="courseCard">
      <div className="courseIcon">{code.slice(0, 2)}</div>

      <div>
        <p className="courseCardCode">Code: {code}</p>
        <h3 className="courseCardTitle">{title}</h3>
        <p className="courseCardSemester">Semester: {semester}</p>
      </div>
    </article>
  );
}

export default CourseCard;