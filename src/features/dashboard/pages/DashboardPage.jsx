import '../dashboard.css'

import CourseCard from '../components/CourseCard';
import TaskCard from '../components/TaskCard';
import StatCard from '../components/StatCard';
import '../dashboard.css'

function DashboardPage() {

  const courseData =[
    {code: "CS101", name: "Introduction to Computer Science", semester: 3},
    {code: "CS102", name: "Data Structures and Algorithms", semester: 3},
    {code: "CS103", name: "Database Systems", semester: 3},
    {code: "CS104", name: "Operating Systems", semester: 3},
  ];

  const userData = {
    name: "Shela",
    programme: "Computer Science",
    university: "University of Colombo"
  };

  const statData = [
    {title: "Total Courses", value: 5},
    {title: "Completed Courses", value: 3},
    {title: "Pending Courses", value: 2},
    {title: "Total Tasks", value: 10},
    {title: "Completed Tasks", value: 7},
    {title: "Pending Tasks", value: 3},
  ];

  const taskData = [
    {title: "Task 1", course: "CS101", dueDate: "2024-06-15", priority: "High"},
    {title: "Task 2", course: "CS102", dueDate: "2024-06-20", priority: "Medium"},
    {title: "Task 3", course: "CS103", dueDate: "2024-06-25", priority: "Low"},
    {title: "Task 4", course: "CS104", dueDate: "2024-06-30", priority: "High"},
  ];


  return (
    <div className="dashboardPage">
      <section>
        <h2>User Profile</h2>
        <div className="userProfile">
          <h3>{userData.name}</h3>
          <p>{userData.programme}</p>
          <p>{userData.university}</p>
        </div>
      </section>

      <section>
        <h2>Overview</h2>
        <div className="statsGrid">{
            statData.map((stat)=>(
                <StatCard key={stat.title} title={stat.title} value={stat.value} />
            ))
        }</div>
      </section>

      <section>
        <h2>Recent Courses</h2>
        <div className="coursesGrid">{
            courseData.map((course)=>(
                <CourseCard key={course.code} code={course.code} title={course.name} semester={course.semester} />
            ))
        }</div>
      </section>

      <section>
        <h2>Upcoming Tasks</h2>
        <div className="tasksList">
             {
                taskData.map((task)=>(
                    <TaskCard key={task.title} title={task.title} course={task.course} dueDate={task.dueDate} priority={task.priority} />
                ))
            }
        </div>
      </section>
    </div>
  )
}

export default DashboardPage