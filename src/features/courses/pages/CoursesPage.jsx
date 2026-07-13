import { Link } from 'react-router';

import { getAllCourses } from '../courseData';
import '../courses.css';

export default function CoursesPage() {
  const courses = getAllCourses();

  return (
    <section className="coursesPage">
      <div className="coursesHeader">
        <div>
          <h1>Courses</h1>

          <p>
            Open a course to view its overview, tasks, and
            notes through nested routes.
          </p>
        </div>
      </div>

      <div className="courseRouteGrid">
        {courses.map((course) => (
          <article
            className="courseRouteCard"
            key={course.id}
          >
            <span className="courseRouteCode">
              {course.code}
            </span>

            <h2>{course.title}</h2>

            <p className="courseRouteSemester">
              {course.semester}
            </p>

            <p className="courseRouteDescription">
              {course.description}
            </p>

            <div className="courseProgressHeader">
              <span>Progress</span>
              <strong>{course.progress}%</strong>
            </div>

            <div className="courseProgressTrack">
              <div
                className="courseProgressValue"
                style={{
                  width: `${course.progress}%`,
                }}
              />
            </div>

            <Link
              className="courseRouteLink"
              to={`/courses/${course.id}/overview`}
            >
              Open course
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}