export default {
  cash_out_juridical: {
    percents: 0.3,
    min: {
      amount: 0.5,
      currency: 'EUR',
    },
  },
  cash_out_natural: {
    percents: 0.3,
    week_limit: {
      amount: 1000,
      currency: 'EUR',
    },
  },
  cash_in: {
    percents: 0.03,
    max: {
      amount: 5,
      currency: 'EUR',
    },
  },
};
