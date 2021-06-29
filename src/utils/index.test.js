import { numberToMoney } from './index.js';

describe('The numbersToMoney function', () => {
  it('should rounded to the smallest currency item when passed 0.1 Euro cent', () => {
    expect(numberToMoney(0.021)).toBe('0.03');
  });

  it('should rounded to the smallest currency item when passed 0.9 Euro cent', () => {
    expect(numberToMoney(0.029)).toBe('0.03');
  });

  it('should return `0.00` when passed 0', () => {
    expect(numberToMoney(0)).toBe('0.00');
  });
});
