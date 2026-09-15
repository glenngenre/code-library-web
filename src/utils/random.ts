/**
 * Generates a random integer between the specified minimum and maximum values (inclusive).
 *
 * @param min - The minimum integer value.
 * @param max - The maximum integer value.
 * @returns A random integer between min and max (inclusive).
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random float between the specified minimum and maximum values (inclusive).
 *
 * @param min - The minimum float value.
 * @param max - The maximum float value.
 * @returns A random float between min and max (inclusive).
 */
export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Generates a random string of the specified length using characters from the provided character set.
 *
 * @param length - The desired length of the random string.
 * @param chars - A string containing the characters to use for generating the random string.
 * @returns A random string of the specified length.
 */
export function randomString(length: number, chars: string): string {
  let result = "";
  const charsLength = chars.length;
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  return result;
}

const adjectives = [
  "Happy",
  "Sad",
  "Angry",
  "Excited",
  "Lazy",
  "Brave",
  "Clever",
  "Friendly",
  "Kind",
];

const nouns = ["Cat", "Dog", "Bird", "Fish", "Lion", "Tiger", "Bear", "Monkey", "Elephant"];

/**
 * Generates a random username by combining a random adjective and a random noun.
 *
 * @returns A random username in the format of "<Adjective><Noun>".
 */
export function generateRandomUsername(): string {
  const adjective = adjectives[randomInt(0, adjectives.length - 1)];
  const noun = nouns[randomInt(0, nouns.length - 1)];
  return `${adjective}${noun}`;
}
