import { useRef, useState } from 'react';

export default function UncontrolledForm() {
  const titleRef = useRef(null);
  const priorityRef = useRef(null);

  const [error, setError] = useState('');
  const [submittedTask, setSubmittedTask] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const title = titleRef.current.value.trim();
    const priority = priorityRef.current.value;

    if (!title) {
      setError('Task title is required.');
      titleRef.current.focus();
      return;
    }

    setSubmittedTask({
      title,
      priority,
    });

    setError('');

    event.currentTarget.reset();
    titleRef.current.focus();
  }

  return (
    <form
      className="formCard"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="formHeader">
        <h2 className="formTitle">Uncontrolled form</h2>

        <p className="formDescription">
          The browser stores the input values. React reads them
          through refs only when the form is submitted.
        </p>
      </div>

      <div className="formField">
        <label
          className="formLabel"
          htmlFor="uncontrolled-title"
        >
          Task title
        </label>

        <input
          id="uncontrolled-title"
          className={`formInput ${
            error ? 'formInputInvalid' : ''
          }`}
          ref={titleRef}
          type="text"
          defaultValue=""
          placeholder="Enter a temporary task"
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? 'uncontrolled-title-error' : undefined
          }
        />

        {error && (
          <p
            id="uncontrolled-title-error"
            className="formErrorText"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>

      <div className="formField">
        <label
          className="formLabel"
          htmlFor="uncontrolled-priority"
        >
          Priority
        </label>

        <select
          id="uncontrolled-priority"
          className="formInput"
          ref={priorityRef}
          defaultValue="medium"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="formActions">
        <button
          className="formSubmitButton"
          type="submit"
        >
          Read values using refs
        </button>
      </div>

      {submittedTask && (
        <div
          className="formResult"
          role="status"
        >
          <strong>Submitted DOM values</strong>

          <span>Title: {submittedTask.title}</span>
          <span>Priority: {submittedTask.priority}</span>
        </div>
      )}
    </form>
  );
}