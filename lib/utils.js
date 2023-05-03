export const getDiffOfTwoObjects = (old, newer) => {
  let diff = {};
  for (const [key, oldValue] of Object.entries(old)) {
    if (key in newer) {
      const newerValue = newer[key];
      if (oldValue !== newerValue) {
        diff[key] = newerValue;
      }
    }
  }
  return diff;
};