/**
 * Parse escaped newlines and tabs in a string
 * Converts literal \n and \t to actual newline and tab characters
 * @param str - The string with escaped characters
 * @returns The parsed string with actual newlines and tabs
 */
export function parseEscapedString(str: string): string {
  if (!str) return str;

  return str
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\r/g, "\r")
    .replace(/\\\\/g, "\\");
}

/**
 * Escape special characters in a string for display
 * @param str - The string to escape
 * @returns The escaped string
 */
export function escapeString(str: string): string {
  if (!str) return str;

  return str
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/\t/g, "\\t")
    .replace(/\r/g, "\\r");
}

/**
 * Truncate a string to a maximum length and add ellipsis
 * @param str - The string to truncate
 * @param maxLength - Maximum length before truncation
 * @returns The truncated string
 */
export function truncate(str: string, maxLength: number): string {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}
