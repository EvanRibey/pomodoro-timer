export function formatToTwoNumbers(integer: number) {
  return integer.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
}
