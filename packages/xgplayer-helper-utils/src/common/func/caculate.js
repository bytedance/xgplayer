/**
 *
 * @param {number} num
 * @param {number} fixed
 * @return {number}
 */
const fixedFloat = (num, fixed) => {
  return Number.parseFloat(Number(num).toFixed(fixed))
}
export default {
  fixedFloat
}
