function CourseCard({code, title, semester}) {
  return (
    <div>
      <h3>{title}</h3>
      <p>Code: {code}</p>
      <p>Semester: {semester}</p>
    </div>
  )
}

export default CourseCard