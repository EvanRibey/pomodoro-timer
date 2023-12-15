export default function formatToTwoNumbers(integer: number) {
  return integer.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
}
