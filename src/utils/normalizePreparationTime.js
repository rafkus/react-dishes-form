// output: 12:34:56
const normalizePreparationTime = value => {
  if (!value) {
    return value;
  }

  const SEPARATOR = ":";
  const FIRST_INDEX = 2;
  const SECOND_INDEX = 4;
  const THIRD_INDEX = 6;

  const onlyNums = value.replace(/[^\d]/g, "");
  if (onlyNums.length <= FIRST_INDEX) {
    return onlyNums;
  }
  if (onlyNums.length <= SECOND_INDEX) {
    return `${onlyNums.slice(0, FIRST_INDEX)}${SEPARATOR}${onlyNums.slice(
      FIRST_INDEX
    )}`;
  }
  return `${onlyNums.slice(0, FIRST_INDEX)}${SEPARATOR}${onlyNums.slice(
    FIRST_INDEX,
    SECOND_INDEX
  )}${SEPARATOR}${onlyNums.slice(SECOND_INDEX, THIRD_INDEX)}`;
};

export default normalizePreparationTime;
