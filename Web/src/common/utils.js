export const booleanToString = boolVal =>
  boolVal === undefined ? '-' : boolVal ? 'true' : 'false';

export const objectToArrayString = (object, separator = '; ') => {
  return Object.entries(object)
    .map(([key, value]) => `${key}=${value}`)
    .join(separator);
};
