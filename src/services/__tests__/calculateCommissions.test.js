const calculateCommissions = require('../calculateCommissions');
const input = require('../../storage/input.json');
const api = require('../api');

jest.mock('../api');

afterEach(() => {
  api.mockClear();
});

describe('The calculateCommissions function', () => {
  it('should calculate commissions', async () => {
    const commissions = await calculateCommissions(input);

    return expect(commissions).toEqual([
      '0.06', '0.90',
      '87.00', '3.00',
      '0.30', '0.30',
      '5.00', '0.00',
      '0.00',
    ]);
  });

  it('should called 3 times api', async () => {
    await calculateCommissions(input);

    expect(api).toHaveBeenCalledTimes(3);
  });
});
