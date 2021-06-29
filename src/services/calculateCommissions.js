import CashInConfig from '../models/FeeConfigs/CashInFeeConfig.js';
import CashOutConfig from '../models/FeeConfigs/CashOutFeeConfig.js';
import User from '../models/User/User.js';
// utils
import { numberToMoney, calculateWeekNumber } from '../utils/index.js';
// services
import calculateFee from './calculateFee.js';

/**
 * @param {Array} transactions
 * @returns {Promise<void>}
 */
const calculateCommissions = async (transactions) => {
  const cashInConfig = new CashInConfig();
  const cashOutConfig = new CashOutConfig();
  const user = new User();

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

    const { percents, ...config } = configs;

    Object.keys(config).forEach((name) => {
      // parse config and find 'min', 'max' or 'week_limit'
      if (name in calculateFee) {
        const calculateFeeFunction = calculateFee[name];

        const fee = calculateFeeFunction({
          config: { ...config, percents },
          amount,
          userUsedPerWeek: user.getAmountPerWeek({ userId, type, weekNumber }),
        });

        accum.push(fee);
      } else {
        console.error('You can use `min`, `max` or `week_limit` for calculateFee');
      }
    });

    // add amount per week to user
    user.calculateAmountPerWeek({
      userId,
      amount,
      weekNumber,
      type,
    });

    return accum;
  }, []);

  return result.map((value) => numberToMoney(value));
};

export default calculateCommissions;
