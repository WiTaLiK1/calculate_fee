import CashOutFeeConfig from '../CashOutFeeConfig.js';
import api from '../../../services/api.js';
import { response } from '../../../services/__mocks__/api.js';

jest.mock('../../../services/api');

afterEach(() => {
  api.mockClear();
});

describe('The CashOutFeeConfig class', () => {
  describe('The getName method', () => {
    it('should return name', () => {
      const result = CashOutFeeConfig.getName({ type: 'cash_out', userType: 'natural' });

      expect(result).toBe('cash-out-natural');
    });
  });

  describe('The getFeeConfig method', () => {
    it('should return saved config ', () => {
      const cashOutFeeConfig = new CashOutFeeConfig();

      cashOutFeeConfig.setConfig('cash-out-natural', 'test');
      const result = cashOutFeeConfig.getFeeConfig({ type: 'cash_out', userType: 'natural' });

      expect(result).toBe('test');
    });
  });

  describe('The getAllNames method', () => {
    it('should return one name when passed one with type cash_out', () => {
      const data = [{
        type: 'cash_out',
        user_type: 'natural',
      }];

      const names = CashOutFeeConfig.getAllNames(data);

      expect(names).toHaveLength(1);
    });

    it('should return two names when passed data with different user_type', () => {
      const data = [{
        type: 'cash_out',
        user_type: 'juridical',
      }, {
        type: 'cash_out',
        user_type: 'natural',
      }];

      const names = CashOutFeeConfig.getAllNames(data);

      expect(names).toHaveLength(2);
    });
  });

  describe('The prefetchData method', () => {
    describe('when passed data with different user_type', () => {
      it('should called api twice', async () => {
        const data = [{
          user_id: 1,
          type: 'cash_out',
          user_type: 'juridical',
        }, {
          user_id: 2,
          type: 'cash_out',
          user_type: 'natural',
        }];

        const cashOutFeeConfig = new CashOutFeeConfig();

        await cashOutFeeConfig.prefetchData(data);

        expect(api).toHaveBeenCalledTimes(2);
      });

      it('should save two settings', async () => {
        const data = [{
          user_id: 1,
          type: 'cash_out',
          user_type: 'juridical',
        }, {
          user_id: 2,
          type: 'cash_out',
          user_type: 'natural',
        }];

        const cashOutFeeConfig = new CashOutFeeConfig();

        await cashOutFeeConfig.prefetchData(data);

        const setting1 = cashOutFeeConfig.getConfig('cash-out-juridical');
        const setting2 = cashOutFeeConfig.getConfig('cash-out-natural');

        expect(setting1).toEqual(response['cash-out-juridical']);
        expect(setting2).toEqual(response['cash-out-natural']);
      });
    });
  });
});
