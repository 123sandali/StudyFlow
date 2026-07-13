import { useState } from 'react';
import {
  validateEmail,
  validateMaxLength,
  validateRequired,
} from '../../../utils/validation';

const EMPTY_PROFILE = {
  displayName: '',
  email: '',
  university: '',
  programme: '',
};

function validateProfileValues(values) {
  const nextErrors = {};

  const displayNameError =
    validateRequired(values.displayName, 'Display name') ??
    validateMaxLength(
      values.displayName,
      60,
      'Display name',
    );

  const emailError =
    validateRequired(values.email, 'Email') ??
    validateEmail(values.email);

  const universityError =
    validateRequired(values.university, 'University') ??
    validateMaxLength(
      values.university,
      100,
      'University',
    );

  const programmeError =
    validateRequired(values.programme, 'Programme') ??
    validateMaxLength(
      values.programme,
      100,
      'Programme',
    );

  if (displayNameError) {
    nextErrors.displayName = displayNameError;
  }

  if (emailError) {
    nextErrors.email = emailError;
  }

  if (universityError) {
    nextErrors.university = universityError;
  }

  if (programmeError) {
    nextErrors.programme = programmeError;
  }

  if (Object.keys(nextErrors).length > 0) {
    nextErrors.form =
      'Some profile information is missing or invalid.';
  }

  return nextErrors;
}

export default function ProfileForm({
  initialValues,
  onSubmit,
}) {
  const [values, setValues] = useState(() => ({
    ...EMPTY_PROFILE,
    ...initialValues,
  }));

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };

      delete nextErrors[name];
      delete nextErrors.form;

      return nextErrors;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateProfileValues(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      displayName: values.displayName.trim(),
      email: values.email.trim(),
      university: values.university.trim(),
      programme: values.programme.trim(),
    });

    setErrors({});
  }

  return (
    <form
      className="formCard"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="formHeader">
        <h2 className="formTitle">Profile information</h2>

        <p className="formDescription">
          This controlled form stores every input value in React
          state.
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

      <div className="formGrid">
        <div className="formField">
          <label
            className="formLabel"
            htmlFor="profile-display-name"
          >
            Display name
            <span className="formRequired"> *</span>
          </label>

          <input
            id="profile-display-name"
            className={`formInput ${
              errors.displayName ? 'formInputInvalid' : ''
            }`}
            name="displayName"
            type="text"
            value={values.displayName}
            onChange={handleChange}
            aria-invalid={Boolean(errors.displayName)}
            aria-describedby={
              errors.displayName
                ? 'profile-display-name-error'
                : undefined
            }
          />

          {errors.displayName && (
            <p
              id="profile-display-name-error"
              className="formErrorText"
              role="alert"
            >
              {errors.displayName}
            </p>
          )}
        </div>

        <div className="formField">
          <label
            className="formLabel"
            htmlFor="profile-email"
          >
            Email
            <span className="formRequired"> *</span>
          </label>

          <input
            id="profile-email"
            className={`formInput ${
              errors.email ? 'formInputInvalid' : ''
            }`}
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email
                ? 'profile-email-error'
                : undefined
            }
          />

          {errors.email && (
            <p
              id="profile-email-error"
              className="formErrorText"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div className="formField">
          <label
            className="formLabel"
            htmlFor="profile-university"
          >
            University
            <span className="formRequired"> *</span>
          </label>

          <input
            id="profile-university"
            className={`formInput ${
              errors.university ? 'formInputInvalid' : ''
            }`}
            name="university"
            type="text"
            value={values.university}
            onChange={handleChange}
            aria-invalid={Boolean(errors.university)}
            aria-describedby={
              errors.university
                ? 'profile-university-error'
                : undefined
            }
          />

          {errors.university && (
            <p
              id="profile-university-error"
              className="formErrorText"
              role="alert"
            >
              {errors.university}
            </p>
          )}
        </div>

        <div className="formField">
          <label
            className="formLabel"
            htmlFor="profile-programme"
          >
            Degree programme
            <span className="formRequired"> *</span>
          </label>

          <input
            id="profile-programme"
            className={`formInput ${
              errors.programme ? 'formInputInvalid' : ''
            }`}
            name="programme"
            type="text"
            value={values.programme}
            onChange={handleChange}
            aria-invalid={Boolean(errors.programme)}
            aria-describedby={
              errors.programme
                ? 'profile-programme-error'
                : undefined
            }
          />

          {errors.programme && (
            <p
              id="profile-programme-error"
              className="formErrorText"
              role="alert"
            >
              {errors.programme}
            </p>
          )}
        </div>
      </div>

      <div className="formActions">
        <button
          className="formSubmitButton"
          type="submit"
        >
          Save profile
        </button>
      </div>
    </form>
  );
}