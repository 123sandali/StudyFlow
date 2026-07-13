import {
  Link,
  NavLink,
  Outlet,
  useParams,
} from 'react-router';

import { getCourseById } from '../courseData';

export default function CourseLayout() {
  const { courseId } = useParams();

  const course = getCourseById(courseId);

  if (!course) {
    return (
      <section className="courseMissing">
        <h1>Course not found</h1>

        <p>
          The selected course does not exist.
        </p>

        <Link
          className="routePrimaryLink"
          to="/courses"
        >
          Return to courses
        </Link>
      </section>
    );
  }

  return (
    <section className="courseDetailPage">
      <div className="courseDetailHeader">
        <div>
          <span className="courseRouteCode">
            {course.code}
          </span>

          <h1>{course.title}</h1>

          <p>{course.semester}</p>
        </div>

        <Link
          className="courseBackLink"
          to="/courses"
        >
          Back to courses
        </Link>
      </div>

      <nav
        className="courseTabs"
        aria-label="Course sections"
      >
        <NavLink
          className={({ isActive }) =>
            `courseTab ${
              isActive ? 'courseTabActive' : ''
            }`
          }
          to="overview"
        >
          Overview
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `courseTab ${
              isActive ? 'courseTabActive' : ''
            }`
          }
          to="tasks"
        >
          Tasks
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `courseTab ${
              isActive ? 'courseTabActive' : ''
            }`
          }
          to="notes"
        >
          Notes
        </NavLink>
      </nav>

      <div className="courseNestedContent">
        <Outlet context={{ course }} />
      </div>
    </section>
  );
}