const CashInFeeConfig = require('../CashInFeeConfig');
const api = require('../../../services/api');

jest.mock('../../../services/api');

afterEach(() => {
  api.mockClear();
});

describe('The CashInFeeConfig class', () => {
  describe('The getName method', () => {
    it('should replace _ with -', () => {
      expect(CashInFeeConfig.getName({ type: 'cash_in' })).toBe('cash-in');
    });
  });

  describe('The prefetchData method', () => {
    describe('when data has cash_in type', () => {
      it('should call api when data has cash_in type', async () => {
        const data = [{
          type: 'cash_in',
        }];
        const cashInFeeConfig = new CashInFeeConfig();

        await cashInFeeConfig.prefetchData(data);

        expect(api).toBeCalledWith('cash-in');
      });

      it('should save config when data has cash_in type', async () => {
        const data = [{
          type: 'cash_in',
        }];
        const cashInFeeConfig = new CashInFeeConfig();

        await cashInFeeConfig.prefetchData(data);

        expect(cashInFeeConfig.getConfig('cash-in')).toBe(api.response['cash-in']);
      });
    });

    it('should call api once when data has more than 1 cash_in type', async () => {
      const data = [{
        userId: 1,
        type: 'cash_in',
      }, {
        userId: 2,
        type: 'cash_in',
      }];
      const cashInFeeConfig = new CashInFeeConfig();

      await cashInFeeConfig.prefetchData(data);

      expect(api).toBeCalledTimes(1);
      expect(api).toBeCalledWith('cash-in');
    });
  });

  describe('The getAllNames method', () => {
    it('should return 1 name when data has 1 cash_in type', () => {
      const data = [{
        type: 'cash_in',
      }];
      const result = CashInFeeConfig.getAllNames(data);

      expect(result).toHaveLength(1);
    });

    it('should return 1 name when data has more than 1 cash_in type', () => {
      const data = [{
        userId: 1,
        type: 'cash_in',
      }, {
        userId: 2,
        type: 'cash_in',
      }, {
        userId: 3,
        type: 'cash_in',
      }];
      const result = CashInFeeConfig.getAllNames(data);

      expect(result).toHaveLength(1);
    });

    it('should return empty array when data has no one cash_in type', () => {
      const data = [{
        userId: 1,
        type: 'cash_out',
      }];
      const result = CashInFeeConfig.getAllNames(data);

      expect(result).toHaveLength(0);
    });
  });

  describe('The getFeeConfig method', () => {
    it('should return saved config', () => {
      const prop = {
        type: 'cash_in',
      };
      const cashInFeeConfig = new CashInFeeConfig();

      cashInFeeConfig.setConfig('cash-in', 'test');
      const result = cashInFeeConfig.getFeeConfig(prop);

      expect(result).toBe('test');
    });
  });
});
