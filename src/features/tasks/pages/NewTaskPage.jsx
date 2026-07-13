import {
  Form,
  Link,
  useActionData,
  useNavigation,
} from 'react-router';

export default function NewTaskPage() {
  const actionData = useActionData();

  const navigation = useNavigation();

  const isSubmitting =
    navigation.state === 'submitting';

  return (
    <section className="taskRoutePage">
      <div className="taskRouteHeader">
        <div>
          <span className="taskRouteEyebrow">
            React Router action
          </span>

          <h1>Create a task</h1>

          <p>
            This form submits directly to the route action.
          </p>
        </div>

        <Link
          className="taskRouteBackLink"
          to="/tasks"
        >
          Cancel
        </Link>
      </div>

      <Form
        className="formCard taskRouteForm"
        method="post"
        noValidate
      >
        {actionData?.errors && (
          <div
            className="formBannerError"
            role="alert"
          >
            Please correct the highlighted fields.
          </div>
        )}

        <div className="formField">
          <label
            className="formLabel"
            htmlFor="route-task-title"
          >
            Task title
            <span className="formRequired">
              {' '}
              *
            </span>
          </label>

          <input
            id="route-task-title"
            className={`formInput ${
              actionData?.errors?.title
                ? 'formInputInvalid'
                : ''
            }`}
            name="title"
            type="text"
            defaultValue={
              actionData?.values?.title ?? ''
            }
            placeholder="Example: Review React Router loaders"
            autoFocus
          />

          {actionData?.errors?.title && (
            <p
              className="formErrorText"
              role="alert"
            >
              {actionData.errors.title}
            </p>
          )}
        </div>

        <div className="formGrid">
          <div className="formField">
            <label
              className="formLabel"
              htmlFor="route-task-priority"
            >
              Priority
            </label>

            <select
              id="route-task-priority"
              className="formInput"
              name="priority"
              defaultValue={
                actionData?.values?.priority ??
                'medium'
              }
            >
              <option value="low">
                Low
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="high">
                High
              </option>
            </select>
          </div>

          <div className="formField">
            <label
              className="formLabel"
              htmlFor="route-task-due-date"
            >
              Due date
            </label>

            <input
              id="route-task-due-date"
              className={`formInput ${
                actionData?.errors?.dueDate
                  ? 'formInputInvalid'
                  : ''
              }`}
              name="dueDate"
              type="date"
              defaultValue={
                actionData?.values?.dueDate ?? ''
              }
            />

            {actionData?.errors?.dueDate && (
              <p
                className="formErrorText"
                role="alert"
              >
                {actionData.errors.dueDate}
              </p>
            )}
          </div>
        </div>

        <div className="formActions">
          <Link
            className="formSecondaryButton taskCancelLink"
            to="/tasks"
          >
            Cancel
          </Link>

          <button
            className="formSubmitButton"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Creating task...'
              : 'Create task'}
          </button>
        </div>
      </Form>
    </section>
  );
}