const calculateFee = {
  /**
   * Calculate 'no more than *'
   *
   * @param {number} percents
   * @param {{amount: number}} max
   * @param {number} amount
   * @returns {number}
   */
  max: ({ config: { percents, max }, amount }) => Math.min(((amount * percents) / 100), max.amount),
  /**
   * Calculate 'not less than *'
   *
   * @param {number} percents
   * @param {{ amount: number }} min
   * @param {number} amount
   * @returns {number}
   */
  min: ({ config: { percents, min }, amount }) => Math.max(((amount * percents) / 100), min.amount),
  /**
   * Calculate fee for week limit
   *
   * @param {number} percents
   * @param {{ amount: number }} weekLimit
   * @param {number} amount
   * @param {number} userUsedPerWeek
   * @returns {number}
   */
  week_limit: ({ config: { percents, week_limit: weekLimit }, amount, userUsedPerWeek }) => {
    if (amount + userUsedPerWeek > weekLimit.amount) { // if user used more than week limit
      let newAmount = amount;

      if (userUsedPerWeek < weekLimit.amount) {
        // calculate without free
        newAmount = amount + userUsedPerWeek - weekLimit.amount;
      }

      return (newAmount * percents) / 100;
    }
    // if user used less than week limit
    return 0;
  },
};

module.exports = calculateFee;
