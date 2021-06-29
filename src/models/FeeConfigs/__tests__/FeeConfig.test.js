import FeeConfig from '../FeeConfig.js';
import api from '../../../services/api.js';
import { response } from '../../../services/__mocks__/api.js';

jest.mock('../../../services/api');

afterEach(() => {
  api.mockClear();
});

describe('The FeeConfig class', () => {
  describe('The getConfig method', () => {
    it('should return undefined when config is not exist', () => {
      const feeConfig = new FeeConfig();

      expect(feeConfig.getConfig('test')).toBeUndefined();
    });
  });

  describe('The setConfig method', () => {
    it('should set config', () => {
      const feeConfig = new FeeConfig();

      feeConfig.setConfig('test', 'ttt');

      expect(feeConfig.getConfig('test')).toBe('ttt');
    });
  });

  describe('The typesToUrl method', () => {
    it('should replace _ with -', () => {
      expect(FeeConfig.typesToUrl(['cash_in'])).toBe('cash-in');
    });

    it('should concat all types', () => {
      expect(FeeConfig.typesToUrl(['cash-out', 'natural'])).toBe('cash-out-natural');
    });
  });

  describe('The getConfigByName method', () => {
    describe('when config exist', () => {
      it('should return config', async () => {
        const feeConfig = new FeeConfig();

        feeConfig.setConfig('test', 'ttt');

        expect(await feeConfig.getConfigByName('test')).toBe('ttt');
      });

      it('should not call api', async () => {
        const feeConfig = new FeeConfig();

        feeConfig.setConfig('test', 'ttt');

        await feeConfig.getConfigByName('test');

        expect(api).not.toBeCalled();
      });
    });

    describe('when config not exist', () => {
      it('should call api', async () => {
        const feeConfig = new FeeConfig();

        await feeConfig.getConfigByName('test');

        expect(api).toBeCalledWith('test');
      });

      it('should get config from api', async () => {
        const feeConfig = new FeeConfig();

        const config = await feeConfig.getConfigByName('cash-in');

        expect(config).toEqual(response['cash-in']);
      });

      it('should set config from api', async () => {
        const feeConfig = new FeeConfig();

        await feeConfig.getConfigByName('cash-in');
        const config = feeConfig.getConfig('cash-in');

        expect(config).toEqual(response['cash-in']);
      });
    });

    describe('The getAllConfigs', () => {
      describe('when passed 2 different names', () => {
        it('should call 2 times api ', async () => {
          const feeConfig = new FeeConfig();

          await feeConfig.getAllConfigs(['cash-in', 'cash-out-natural']);

          expect(api).toBeCalledTimes(2);
        });

        it('should return 2 configs', async () => {
          const feeConfig = new FeeConfig();

          const [config1, config2] = await feeConfig.getAllConfigs(['cash-in', 'cash-out-natural']);

          expect(config1).toStrictEqual(response['cash-in']);
          expect(config2).toStrictEqual(response['cash-out-natural']);
        });

        it('should set 2 configs', async () => {
          const feeConfig = new FeeConfig();

          await feeConfig.getAllConfigs(['cash-in', 'cash-out-natural']);

          const config1 = feeConfig.getConfig('cash-in');
          const config2 = feeConfig.getConfig('cash-out-natural');

          expect(config1).toStrictEqual(response['cash-in']);
          expect(config2).toStrictEqual(response['cash-out-natural']);
        });
      });
    });
  });
});
