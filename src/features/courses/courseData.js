export const COURSES = {
  react: {
    id: 'react',
    code: 'CS-REACT',
    title: 'React Development',
    semester: 'Semester 2',
    description:
      'Components, hooks, forms, state architecture, routing, and Firebase integration.',
    progress: 68,
    tasks: [
      'Complete React Router setup',
      'Review useReducer patterns',
      'Prepare component tests',
    ],
    notes: [
      'useEffect cleanup patterns',
      'React Hook Form notes',
      'Reducer and Context comparison',
    ],
  },

  robotics: {
    id: 'robotics',
    code: 'CS-ROBO',
    title: 'Robotics',
    semester: 'Semester 2',
    description:
      'Robot control, sensors, simulation, and embedded-system development.',
    progress: 42,
    tasks: [
      'Complete sensor calibration',
      'Prepare laboratory report',
    ],
    notes: [
      'PID tuning observations',
      'Servo control notes',
    ],
  },

  modelling: {
    id: 'modelling',
    code: 'CS-MATH',
    title: 'Mathematical Modelling',
    semester: 'Semester 2',
    description:
      'Mathematical techniques for modelling and analysing computational systems.',
    progress: 81,
    tasks: [
      'Complete linear systems exercise',
      'Review eigenvalue examples',
    ],
    notes: [
      'Matrix decomposition',
      'Differential equation examples',
    ],
  },
};

export function getCourseById(courseId) {
  return COURSES[courseId] ?? null;
}

export function getAllCourses() {
  return Object.values(COURSES);
}