import getISOWeek from 'date-fns/getWeek/index.js';

/**
 * Round value and format to string
 *
 * @param {number} value
 * @returns {string}
 */
export const numberToMoney = (value) => (Math.ceil(value * 100) / 100).toFixed(2);

/**
 * Calculate week number from date
 *
 * @param {Date} date
 * @returns {number} - week number
 */
export const calculateWeekNumber = (date) => getISOWeek(new Date(date), {
  weekStartsOn: 1,
});
