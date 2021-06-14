const CashInConfig = require('../FeeConfigs/CashInFeeConfig');
const CashOutConfig = require('../FeeConfigs/CashOutFeeConfig');
const Users = require('../Users/Users');
// utils
const { numbersToMoney, calculateWeekNumber } = require('../utils');
// services
const calculateFee = require('./calculateFee');

/**
 * @param {Array} transactions
 * @returns {Promise<void>}
 */
const calculateCommissions = async (transactions) => {
  const cashInConfig = new CashInConfig();
  const cashOutConfig = new CashOutConfig();
  const users = new Users();

  // Prefetch and save configs
  await Promise.all([
    cashInConfig.prefetchData(transactions),
    cashOutConfig.prefetchData(transactions),
  ]);

  // calculate fee
  const result = transactions.reduce((accum, {
    user_id: userId, date, type, user_type: userType, operation: { amount },
  }) => {
    let configs = {};

    // get config from api
    switch (type) {
      case 'cash_in': {
        configs = cashInConfig.getFeeConfig({ type });
        break;
      }
      case 'cash_out': {
        configs = cashOutConfig.getFeeConfig({ type, userType });
        break;
      }
      default: {
        console.error('Cannot read type');
      }
    }

    // calculate week number
    const weekNumber = calculateWeekNumber(date);

    // add amount per week to user
    users.calculateAmountPerWeek({
      userId,
      amount,
      weekNumber,
      type,
    });

    const { percents, ...config } = configs;

    Object.keys(config).forEach((name) => {
      // parse config and find 'min', 'max' or 'week_limit'
      if (name in calculateFee) {
        const calculateFeeFunction = calculateFee[name];

        const fee = calculateFeeFunction({
          config: { ...config, percents },
          amount,
          userUsedPerWeek: users.getAmountPerWeek({ userId, type, weekNumber }),
        });

        accum.push(fee);
      } else {
        console.error('You can use `min`, `max` or `week_limit` for calculateFee');
      }
    });

    return accum;
  }, []);

  return result.map((value) => numbersToMoney(value));
};

module.exports = calculateCommissions;
