/**
 * Validates whether a required text value contains meaningful content.
 *
 * @param {unknown} value - Value received from the form field.
 * @param {string} fieldName - User-friendly field name for the error message.
 * @returns {string|null} Error message when invalid, otherwise null.
 */
export function validateRequired(value, fieldName = 'Field') {
  if (typeof value !== 'string' || value.trim() === '') {
    return `${fieldName} is required.`;
  }

  return null;
}

/**
 * Validates whether a text value stays within the maximum character limit.
 *
 * @param {unknown} value - Value received from the form field.
 * @param {number} max - Maximum number of allowed characters.
 * @param {string} fieldName - User-friendly field name for the error message.
 * @returns {string|null} Error message when invalid, otherwise null.
 */
export function validateMaxLength(
  value,
  max,
  fieldName = 'Field',
) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const textValue = String(value);

  if (textValue.length > max) {
    return `${fieldName} must not exceed ${max} characters.`;
  }

  return null;
}

/**
 * Validates a date-input value.
 *
 * Empty values are accepted because required validation should be handled
 * separately when the form requires a date.
 *
 * @param {string} value - Date value in YYYY-MM-DD format.
 * @returns {string|null} Error message when invalid, otherwise null.
 */
export function validateDate(value) {
  if (!value) {
    return null;
  }

  const selectedDate = new Date(`${value}T00:00:00`);

  if (Number.isNaN(selectedDate.getTime())) {
    return 'Please select a valid date.';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return 'Due date cannot be in the past.';
  }

  return null;
}