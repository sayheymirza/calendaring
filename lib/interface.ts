// types
export type TCalendaringFormatter = "jalali" | "gregorian";

export type TCalendaringLocale = "en" | "fa";

export enum ECalendaringFormat {
  J_YYYY_MM_DD = "jYYYY-jM-jD",
  G_YYYY_MM_DD = "YYYY-M-D",
}
// interfaces
export interface ICalendaringDayValue<T> {
  [key: number]: T; // number as key is day number and value as data of the day
}

export interface ICalendaringDay<T> {
  day: number;
  value: T | null; // null for default or no value for the day
}

export interface ICalendaringOutput<T> {
  count: number; // count of days in the month
  length: number; // number of days with nulls in the month
  array: ICalendaringDay<T>[];
}
