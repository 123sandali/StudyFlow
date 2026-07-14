# StudyFlow

StudyFlow is an ongoing React-based student productivity dashboard for managing academic tasks, study progress, courses, notes, and focus activities through a clean, responsive interface.

## Current Features

- Responsive application shell with reusable `Sidebar`, `TopBar`, and page layout components
- Dashboard with reusable user, statistics, course, and task cards
- Controlled task form with input validation
- React state handling for creating, completing, and deleting tasks
- Browser-based local persistence using `localStorage`
- Reusable, feature-based component structure
- Responsive custom CSS for desktop, tablet, and mobile layouts

## Technologies

- React
- JavaScript
- Vite
- HTML5
- CSS3
- localStorage
- Lucide React
- Git and GitHub

## Project Structure

```text
src/
├── components/
│   ├── common/
│   └── layout/
├── features/
│   ├── dashboard/
│   ├── tasks/
│   ├── focus/
│   ├── notes/
│   ├── resources/
│   ├── profile/
│   └── settings/
├── hooks/
├── styles/
├── App.jsx
└── main.jsx
```

## Run Locally

```bash
git clone <repository-url>
cd studyflow
npm install
npm run dev
```

Open the local URL displayed by Vite, normally `http://localhost:5173`.

## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```

## Development Status

**Ongoing — React frontend development**

The current version focuses on reusable components, controlled forms, state management, local persistence, and responsive UI development.

## Planned Enhancements

- React Router navigation
- Advanced task filtering and editing
- Course, note, resource, and focus-session management
- Form improvements and reusable custom hooks
- Automated testing
- Firebase Authentication and Cloud Firestore integration
- Cloud deployment and multi-device synchronization

## Author

**Sandali Shela Nanayakkara**  
Software Engineering Undergraduate
University of Sri Jayewardenepura