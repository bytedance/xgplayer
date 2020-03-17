var fixedFloat = function fixedFloat(num, fixed) {
  return Number.parseFloat(Number(num).toFixed(fixed));
};
export default {
  fixedFloat: fixedFloat
};