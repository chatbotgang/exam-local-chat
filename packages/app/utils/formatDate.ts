export const formatDate = (date: number = 0) => {
  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    throw new TypeError("Invalid date input");
  }

  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};
