export const sortedInsert = (array, value, compare = defaultCompare) => {
  let low = 0;
  let high = array.length - 1;
  while (low < high) {
    let mid = low + Math.floor((high - low) / 2);
    if (compare(array[mid].name, value.name) > 0) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  array.splice(low, 0, value);
  return array;
};

export const defaultCompare = (a, b) => {
  if (a < b) {
    return -1;
  }
  return 1;
};
