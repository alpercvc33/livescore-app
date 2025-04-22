import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNow } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, formatString = "PP") {
  return format(new Date(date), formatString)
}

export function formatTimeAgo(date: string | Date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function formatMatchTime(minute: string) {
  if (!minute) return ""

  // Remove any non-numeric characters
  const numericMinute = minute.replace(/\D/g, "")

  if (!numericMinute) return minute

  const minuteNumber = Number.parseInt(numericMinute, 10)

  if (minuteNumber <= 45) {
    return `${minuteNumber}'`
  } else if (minuteNumber <= 90) {
    return `${minuteNumber}'`
  } else if (minuteNumber > 90) {
    return "90+'"
  }

  return minute
}
