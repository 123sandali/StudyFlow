import { useState } from 'react';
import {
  validateDate,
  validateMaxLength,
  validateRequired,
} from '../../../utils/validation';

const INITIAL_VALUES = {
  title: '',
  priority: 'medium',
  dueDate: '',
};

function validateTaskValues(values) {
  const nextErrors = {};

  const titleError =
    validateRequired(values.title, 'Title') ??
    validateMaxLength(values.title, 100, 'Title');

  const dueDateError = validateDate(values.dueDate);

  if (titleError) {
    nextErrors.title = titleError;
  }

  if (dueDateError) {
    nextErrors.dueDate = dueDateError;
  }

  if (Object.keys(nextErrors).length > 0) {
    nextErrors.form =
      'Please correct the highlighted fields before submitting.';
  }

  return nextErrors;
}

export default function TaskFormManual({ onSubmit }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    /*
     * Clear only the error connected to the field being edited.
     * This gives immediate feedback after the user fixes the value.
     */
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };

      delete nextErrors[name];
      delete nextErrors.form;

      return nextErrors;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateTaskValues(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      title: values.title.trim(),
      priority: values.priority,
      dueDate: values.dueDate,
    });

    setValues(INITIAL_VALUES);
    setErrors({});
  }

  return (
    <form
      className="formCard"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="formHeader">
        <h2 className="formTitle">Add a task manually</h2>

        <p className="formDescription">
          Controlled form using useState and custom validation.
        </p>
      </div>

      {errors.form && (
        <div
          className="formBannerError"
          role="alert"
        >
          {errors.form}
        </div>
      )}

      <div className="formField">
        <label
          className="formLabel"
          htmlFor="manual-task-title"
        >
          Task title
          <span className="formRequired"> *</span>
        </label>

        <input
          id="manual-task-title"
          className={`formInput ${
            errors.title ? 'formInputInvalid' : ''
          }`}
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          maxLength={110}
          placeholder="Example: Complete React form exercise"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={
            errors.title ? 'manual-task-title-error' : undefined
          }
        />

        <div className="formHint">
          Maximum 100 meaningful characters.
        </div>

        {errors.title && (
          <p
            id="manual-task-title-error"
            className="formErrorText"
            role="alert"
          >
            {errors.title}
          </p>
        )}
      </div>

      <div className="formGrid">
        <div className="formField">
          <label
            className="formLabel"
            htmlFor="manual-task-priority"
          >
            Priority
          </label>

          <select
            id="manual-task-priority"
            className="formInput"
            name="priority"
            value={values.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="formField">
          <label
            className="formLabel"
            htmlFor="manual-task-due-date"
          >
            Due date
          </label>

          <input
            id="manual-task-due-date"
            className={`formInput ${
              errors.dueDate ? 'formInputInvalid' : ''
            }`}
            name="dueDate"
            type="date"
            value={values.dueDate}
            onChange={handleChange}
            aria-invalid={Boolean(errors.dueDate)}
            aria-describedby={
              errors.dueDate
                ? 'manual-task-due-date-error'
                : undefined
            }
          />

          {errors.dueDate && (
            <p
              id="manual-task-due-date-error"
              className="formErrorText"
              role="alert"
            >
              {errors.dueDate}
            </p>
          )}
        </div>
      </div>

      <div className="formActions">
        <button
          className="formSubmitButton"
          type="submit"
        >
          Add task
        </button>
      </div>
    </form>
  );
}