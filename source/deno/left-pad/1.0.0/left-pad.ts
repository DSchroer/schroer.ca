/**
 * Pad a string with values on the left
 * @param value the string to pad
 * @param count number of times the padding should repeat
 * @param padding what should be used to pad the string
 */
export function leftPad(
  value: string,
  count: number,
  padding?: string | number
): string;
export function leftPad(
  value: unknown,
  count: number,
  padding?: string | number
): string;
export function leftPad(
  value: unknown,
  count: number,
  padding: string | number = " "
): string {
  if (typeof padding == "number") {
    padding = String.fromCharCode(padding);
  }

  const stringValue = "" + value;
  const paddingValue = count - stringValue.length;

  if (paddingValue <= 0) {
    return stringValue;
  }

  return padding[0].repeat(paddingValue) + stringValue;
}
