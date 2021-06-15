const response = {
  'cash-in': {
    percents: 0.03,
    max: {
      amount: 5,
      currency: 'EUR',
    },
  },
  'cash-out-juridical': {
    percents: 0.3,
    min: {
      amount: 0.5,
      currency: 'EUR',
    },
  },
  'cash-out-natural': {
    percents: 0.3,
    week_limit: {
      amount: 1000,
      currency: 'EUR',
    },
  },
};

module.exports = jest.fn().mockImplementation((value) => response[value]);
module.exports.response = response;
