export function parseTimestamp(dateStr: string, timeStr: string): Date {
  const [monthStr, dayStr, yearStr] = dateStr.split("/");
  const [hourStr, minuteStr] = timeStr.split(":");
  return new Date(
    2000 + Number(yearStr),
    Number(monthStr) - 1,
    Number(dayStr),
    Number(hourStr),
    Number(minuteStr)
  );
}

export function dateToSql(date: Date) {
  function addZeros(number: number): string {
    let result = "";
    if (number < 10) {
      result += "0";
    }
    result += `${number}`;
    return result;
  }
  return `${date.getFullYear()}-${addZeros(date.getMonth() + 1)}-${addZeros(
    date.getDate()
  )}`;
}

export function sqlToDate(sqlDate: string) {
  const [yearStr, monthStr, dayStr] = sqlDate.split("-");
  return new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr));
}
