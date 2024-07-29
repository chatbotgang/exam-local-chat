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
export { originalDayjs as dayjs };
