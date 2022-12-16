export function dateFromInput (_date: Date): string {
  const fullYear = _date.getFullYear()
  const month = _date.getMonth()
  const date = _date.getDate()
  const hours = _date.getHours()
  const minutes = _date.getMinutes()

  return `${fullYear}-${month < 10 ? '0' : ''}${month}-${date < 10 ? '0' : ''}${date}T${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`
}
