import { Calendaring } from "../lib";

describe("lib/index.ts", () => {
  const calendaring = new Calendaring();

  it('should "formatter" be "undefined" ok ', () => {
    expect(calendaring.Formatter).toBeUndefined();
  });

  it('should "locale" be "en" ok', () => {
    expect(calendaring.Locale).toBe("en");
  });

  it('should "format" be "YYYY-MM-DD" ok', () => {
    expect(calendaring.Format).toBe("YYYY-M-D");
  });

  it('should "set formatter" be "jalali" ok', () => {
    calendaring.SetFormatter("jalali");

    expect(calendaring.Formatter).toBe("jalali");
    expect(calendaring.Locale).toBe("fa");
    expect(calendaring.Format).toBe("jYYYY-jM-jD");
  });

  it('should "set formatter" be "gregorian" ok', () => {
    calendaring.SetFormatter("gregorian");

    expect(calendaring.Formatter).toBe("gregorian");
    expect(calendaring.Locale).toBe("en");
    expect(calendaring.Format).toBe("YYYY-M-D");
  });

  it('should "generate" for "1401-01" with format "jalali" ok', () => {
    calendaring.SetFormatter("jalali");

    const output = calendaring.Generate<{ [key: string]: string }>(1401, 1, {
      15: { ping: "pong" },
    });

    expect(output.count).toBe(31);
    expect(output.length).toBe(33);
    expect(output.array.length).toBe(33);
    expect(output.array[0]).toEqual({ day: 0, value: null });
    expect(output.array[1]).toEqual({ day: 0, value: null });
    expect(output.array[2]).toEqual({ day: 1, value: null });
    expect(output.array[16]).toEqual({ day: 15, value: { ping: "pong" } });
    expect(output.array[32]).toEqual({ day: 31, value: null });
  });

  it('should "generate" for "2022-03" with format "gregorian" ok', () => {
    calendaring.SetFormatter("gregorian");

    const output = calendaring.Generate<string>(2022, 3, {
      27: "foo-bar",
    });

    expect(output.count).toBe(31);
    expect(output.length).toBe(34);
    expect(output.array.length).toBe(34);
    expect(output.array[0]).toEqual({ day: 0, value: null });
    expect(output.array[1]).toEqual({ day: 0, value: null });
    expect(output.array[2]).toEqual({ day: 0, value: null });
    expect(output.array[3]).toEqual({ day: 1, value: null });
    expect(output.array[29]).toEqual({ day: 27, value: "foo-bar" });
    expect(output.array[33]).toEqual({ day: 31, value: null });
  });
});
