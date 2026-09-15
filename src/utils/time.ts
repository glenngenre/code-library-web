/**
 * Returns a human-readable string representing how long ago the given date was.
 * @param date - The date to compare with the current time.
 * @returns A string like "5 seconds ago", "2 minutes ago", "3 hours ago", or "1 day ago".
 */
export function getTimeAgo(date: Date): string {
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
  } else {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  }
}

/**
 * Returns a human-readable string representing how much time is remaining until the given date.
 * @param targetDate - The future date to compare with the current time.
 * @returns A string like "5 seconds remaining", "2 minutes remaining", "3 hours remaining", or "1 day remaining".
 */
export function getRemainingTime(targetDate: Date): string {
  const now = new Date();
  const secondsRemaining = Math.floor((targetDate.getTime() - now.getTime()) / 1000);

  if (secondsRemaining < 60) {
    return `${secondsRemaining} second${secondsRemaining > 1 ? "s" : ""} remaining`;
  } else if (secondsRemaining < 3600) {
    const minutesRemaining = Math.floor(secondsRemaining / 60);
    return `${minutesRemaining} minute${minutesRemaining > 1 ? "s" : ""}`;
  } else if (secondsRemaining < 86400) {
    const hoursRemaining = Math.floor(secondsRemaining / 3600);
    return `${hoursRemaining} hour${hoursRemaining > 1 ? "s" : ""}`;
  } else {
    const daysRemaining = Math.floor(secondsRemaining / 86400);
    return `${daysRemaining} day${daysRemaining > 1 ? "s" : ""}`;
  }
}

// get date from seconds
// 600 = date now + 600 seconds

/**
 * Returns a Date object representing the time that is a certain number of seconds from now.
 * @param seconds - The number of seconds to add to the current time.
 * @returns A Date object representing the future time.
 */
export function getDateFromSeconds(seconds: number): Date {
  const now = new Date();
  return new Date(now.getTime() + seconds * 1000);
}
