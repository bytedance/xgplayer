/**
 *
 * @param {number} num
 * @param {number} fixed
 * @return {number}
 */
const fixedFloat = (num, fixed) => {
  return parseFloat(Number(num).toFixed(fixed))
}
export default {
  fixedFloat
}
