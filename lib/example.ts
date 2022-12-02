import { Calendaring } from ".";

const calendaring = new Calendaring();

const args = process.argv.slice(2);

const year = args[0] ? Number(args[0]) : 1401;
const month = args[1] ? Number(args[1]) : 0;
const formatter: any =
  args[2] && ["jalali", "gregorian"].includes(args[2]) ? args[2] : "jalali";

calendaring.SetFormatter(formatter);
const output = calendaring.Generate(year, month);

console.log(`\t\t${year}/${month}`);

if (formatter == "jalali") {
  `Sat Sun Mon Tue Wed Thu Fri`
    .split(" ")
    .forEach((item) => process.stdout.write(item + "\t"));
  process.stdout.write("\n");
}

if (formatter == "gregorian") {
  `Sun Mon Tue Wed Thu Fri Sat`
    .split(" ")
    .forEach((item) => process.stdout.write(item + "\t"));
  process.stdout.write("\n");
}

for (let i = 0; i < output.length; i++) {
  if (i != 0 && i % 7 == 0) process.stdout.write("\n");

  process.stdout.write(
    (output.array[i].day != 0 ? output.array[i].day : "") + "\t"
  );
}
process.stdout.write("\n");
