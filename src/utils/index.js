const getISOWeek = require('date-fns/getWeek');

/**
 * Round value and format to string
 *
 * @param {number} value
 * @returns {string}
 */
const numberToMoney = (value) => (Math.ceil(value * 100) / 100).toFixed(2);

/**
 * Calculate week number from date
 *
 * @param {Date} date
 * @returns {number} - week number
 */
const calculateWeekNumber = (date) => getISOWeek(new Date(date), {
  weekStartsOn: 1,
});

module.exports = {
  numberToMoney,
  calculateWeekNumber,
};
