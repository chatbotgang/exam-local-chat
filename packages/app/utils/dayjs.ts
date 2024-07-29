import originalDayjs from "dayjs";
import "dayjs/locale/zh-tw";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

declare module "dayjs" {
  export function utcOffset(): number;
  interface Dayjs {
    locale(locale: Partial<ILocale>): Dayjs;
  }
  interface ILocale {
    meridiem?: (hour: number, minute: number, isLowercase: boolean) => string;
  }
}

originalDayjs.extend(relativeTime);
originalDayjs.extend(timezone);
originalDayjs.extend(utc);

const fromNow = (timestamp?: number) => {
  const currentTimeStamp = timestamp || originalDayjs();
  return originalDayjs().diff(originalDayjs(currentTimeStamp), "hour") > 24
    ? originalDayjs(currentTimeStamp).format("YYYY-MM-DD")
    : originalDayjs(currentTimeStamp).fromNow();
};

export { originalDayjs as dayjs, fromNow };
