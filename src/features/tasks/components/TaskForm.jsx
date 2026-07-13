import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  validateDate,
  validateMaxLength,
  validateRequired,
} from '../../../utils/validation';

const DEFAULT_VALUES = {
  title: '',
  priority: 'medium',
  dueDate: '',
};

function getTodayDateValue() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(
    2,
    '0',
  );
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function TaskForm({ onSubmit }) {
  const titleRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const titleRegistration = register('title', {
    validate: {
      required: (value) =>
        validateRequired(value, 'Title') ?? true,

      maxLength: (value) =>
        validateMaxLength(value, 100, 'Title') ?? true,
    },
  });

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  async function submitTask(values) {
    try {
      await onSubmit({
        title: values.title.trim(),
        priority: values.priority,
        dueDate: values.dueDate,
      });

      reset(DEFAULT_VALUES);

      requestAnimationFrame(() => {
        titleRef.current?.focus();
      });
    } catch (error) {
      console.error('Task submission failed:', error);

      setError('root.submit', {
        type: 'submission',
        message:
          'The task could not be saved. Please try again.',
      });
    }
  }

  const hasValidationErrors =
    Boolean(errors.title) ||
    Boolean(errors.priority) ||
    Boolean(errors.dueDate);

  function handleFormSubmit(event) {
    return handleSubmit(submitTask)(event);
  }

  return (
    <form
      className="formCard"
      onSubmit={handleFormSubmit}
      noValidate
    >
      <div className="formHeader">
        <h2 className="formTitle">Add a new task</h2>

        <p className="formDescription">
          Production form using React Hook Form and reusable
          validators.
        </p>
      </div>

      {hasValidationErrors && (
        <div
          className="formBannerError"
          role="alert"
        >
          Please correct the highlighted fields.
        </div>
      )}

      {errors.root?.submit && (
        <div
          className="formBannerError"
          role="alert"
        >
          {errors.root.submit.message}
        </div>
      )}

      <div className="formField">
        <label
          className="formLabel"
          htmlFor="task-title"
        >
          Task title
          <span className="formRequired"> *</span>
        </label>

        <input
          id="task-title"
          className={`formInput ${
            errors.title ? 'formInputInvalid' : ''
          }`}
          type="text"
          placeholder="Example: Review useReducer notes"
          maxLength={110}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={
            errors.title ? 'task-title-error' : undefined
          }
          {...titleRegistration}
          ref={(element) => {
            titleRegistration.ref(element);
            titleRef.current = element;
          }}
        />

        <div className="formHint">
          Maximum 100 meaningful characters.
        </div>

        {errors.title && (
          <p
            id="task-title-error"
            className="formErrorText"
            role="alert"
          >
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="formGrid">
        <div className="formField">
          <label
            className="formLabel"
            htmlFor="task-priority"
          >
            Priority
          </label>

          <select
            id="task-priority"
            className={`formInput ${
              errors.priority ? 'formInputInvalid' : ''
            }`}
            aria-invalid={Boolean(errors.priority)}
            {...register('priority', {
              required: 'Please select a priority.',
            })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {errors.priority && (
            <p
              className="formErrorText"
              role="alert"
            >
              {errors.priority.message}
            </p>
          )}
        </div>

        <div className="formField">
          <label
            className="formLabel"
            htmlFor="task-due-date"
          >
            Due date
          </label>

          <input
            id="task-due-date"
            className={`formInput ${
              errors.dueDate ? 'formInputInvalid' : ''
            }`}
            type="date"
            min={getTodayDateValue()}
            aria-invalid={Boolean(errors.dueDate)}
            aria-describedby={
              errors.dueDate
                ? 'task-due-date-error'
                : undefined
            }
            {...register('dueDate', {
              validate: (value) =>
                validateDate(value) ?? true,
            })}
          />

          <div className="formHint">
            Optional. Past dates are not accepted.
          </div>

          {errors.dueDate && (
            <p
              id="task-due-date-error"
              className="formErrorText"
              role="alert"
            >
              {errors.dueDate.message}
            </p>
          )}
        </div>
      </div>

      <div className="formActions">
        <button
          className="formSubmitButton"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding task…' : 'Add task'}
        </button>
      </div>
    </form>
  );
}