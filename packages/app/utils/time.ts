export const convertTimestampToLocalTime = (
  timestamp: number,
  locale: string = "zh-TW",
) => {
  const date = new Date(timestamp);
  const formatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  return formatter.format(date);
};
