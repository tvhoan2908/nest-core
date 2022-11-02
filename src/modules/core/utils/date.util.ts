import * as dayjs from "dayjs";
import * as customParseFormat from "dayjs/plugin/customParseFormat";
import * as isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import * as weekday from "dayjs/plugin/weekday";
import * as isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(isoWeek);

export class DateUtils {
  static getCurrentDate(format = "YYYY-MM-DD"): string {
    return this.formatDate(new Date().toISOString(), format);
  }

  static formatDate(date: any, format = "YYYY-MM-DD"): string {
    if (!date) return null;

    return dayjs(date).format(format);
  }

  static parseFormatDate(date: any, parse = "DD/MM/YYYY", format = "YYYY-MM-DD"): string {
    if (!date) return null;

    return dayjs(date, parse).format(format);
  }
}
