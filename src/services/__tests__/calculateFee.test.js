const { min, max, week_limit: weekLimit } = require('../calculateFee');

describe('The calculateFee object', () => {
  describe('The min function', () => {
    const params = {
      config: {
        percents: 0.5,
        max: {
          amount: 4,
        },
      },
    };

    it('should calculate fee when commission < max.amount', () => {
      expect(max({ ...params, amount: 10 })).toBe(0.05);
    });

    it('should return max.amount when commission > max.amount ', () => {
      expect(max({ ...params, amount: 1000 })).toBe(params.config.max.amount);
    });
  });

  describe('The min function', () => {
    const params = {
      config: {
        percents: 0.5,
        min: {
          amount: 4,
        },
      },
    };

    it('should return min.amount when commission < min.amount', () => {
      expect(min({ ...params, amount: 10 })).toBe(params.config.min.amount);
    });

    it('should return commission when commission > min.amount', () => {
      expect(min({ ...params, amount: 1000 })).toBe(5);
    });
  });

  describe('The week_limit function', () => {
    const params = {
      config: {
        percents: 1,
        week_limit: {
          amount: 100,
        },
      },
    };

    it('should return 0 when amount + userUsedPerWeek < week_limit.amount', () => {
      expect(weekLimit({ ...params, amount: 80, userUsedPerWeek: 10 })).toBe(0);
    });

    it('should return 0 when amount + userUsedPerWeek = week_limit.amount', () => {
      expect(weekLimit({ ...params, amount: 100, userUsedPerWeek: 0 })).toBe(0);
    });

    it('should calculate fee when amount + userUsedPerWeek ', () => {
      expect(weekLimit({ ...params, amount: 100, userUsedPerWeek: 100 })).toBe(1);
      expect(weekLimit({ ...params, amount: 250, userUsedPerWeek: 100 })).toBe(2.5);
    });
  });
});
