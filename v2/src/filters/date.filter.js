export default function dateFilter(value) {
  const options = {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  };

  return new Intl.DateTimeFormat("en", options).format(new Date(value));
}
