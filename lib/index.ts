// modules
import moment from "jalali-moment";
// interfaces
import {
  ECalendaringFormat,
  ICalendaringDay,
  ICalendaringDayValue,
  ICalendaringOutput,
  TCalendaringFormatter,
  TCalendaringLocale,
} from "./interface";

export class Calendaring {
  public Formatter!: TCalendaringFormatter;

  /**
   * Get locale from formatter
   * @return {'fa' | 'en'}
   */
  public get Locale(): TCalendaringLocale {
    return this.Formatter == "jalali" ? "fa" : "en";
  }

  /**
   * Get date format from formatter
   * @return {'jYYYY-jMM-jDD' | 'YYYY-MM-DD'}
   */
  public get Format(): string {
    return this.Formatter == "jalali"
      ? ECalendaringFormat.J_YYYY_MM_DD
      : ECalendaringFormat.G_YYYY_MM_DD;
  }

  /**
   * Set date formatter and create today date
   * @param {'jalali' | 'gregorian'} formatter format date
   */
  public SetFormatter(formatter: TCalendaringFormatter): void {
    this.Formatter = formatter;
  }

  public Generate<T>(
    year: number,
    month: number,
    values: ICalendaringDayValue<T> = {}
  ): ICalendaringOutput<T | null> {
    const date = `${year}-${month}-1`;
    // get first day of the month
    const first_day_of_month = moment(date, this.Format).locale(this.Locale);

    // // get last day of the month from the first day of the month
    // const last_day_of_month = first_day_of_month.endOf(
    //   this.Formatter == "jalali" ? "jMonth" : "month"
    // );

    const count_of_days_in_month = first_day_of_month.daysInMonth(); //last_day_of_month.get("D");

    const index_first_day_of_month = first_day_of_month.get("d") + 1;

    const length_of_days_in_month =
      index_first_day_of_month + count_of_days_in_month;

    let array: ICalendaringDay<T | null>[] = Array.from(
      {
        length: length_of_days_in_month,
      },
      (_, i) => {
        const day =
          i < index_first_day_of_month ? 0 : i - index_first_day_of_month + 1;
        // if i was less then start of first day of the month = 0, else index of first day - i + 1

        return {
          day: day,
          value: values[day] ?? null, // if day has value else set null as default value
        };
      }
    );

    if (array.slice(0, 7).every((item) => item.day == 0)) {
      array.splice(0, 7);
    }

    // in gregorian calendar first day is sunday :)
    if (this.Formatter == "gregorian") {
      if (array[0].day == 1) {
        array.unshift(
          ...Array.from({ length: 6 }, (_) => ({ day: 0, value: null }))
        );
      } else {
        array.splice(0, 1);
      }
    }

    return {
      array: array,
      count: count_of_days_in_month,
      length: array.length,
    };
  }
}

export * from "./interface";
