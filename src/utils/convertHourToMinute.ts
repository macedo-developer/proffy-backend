export default function convertHourToMinute(time: string) {
  const [hour, minute] = time.split(':').map(Number);

  const timeInMinutes = hour * 600 + minute;

  return timeInMinutes;
}
