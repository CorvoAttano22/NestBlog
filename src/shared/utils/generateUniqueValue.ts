export function generateUniqueValue(short: boolean = false) {
  const value = crypto.randomUUID();
  if (short) {
    return value.split('-')[0];
  }
  return value;
}
