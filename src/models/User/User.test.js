import User from './User.js';

const defaultUser = {
  userId: 0,
  type: 'cash_in',
};

describe('The User class', () => {
  describe('The getUser method', () => {
    it('should return new user when is mot exist', () => {
      const users = new User();

      const user = users.getUser(defaultUser);

      expect(user).toEqual({ amountWeek: {} });
    });
  });

  describe('The getAmountPerWeek method', () => {
    it('should return 0 when is mot exist', () => {
      const users = new User();

      const user = users.getAmountPerWeek({
        userId: defaultUser.userId,
        type: defaultUser.type,
        weekNumber: 1,
      });

      expect(user).toBe(0);
    });
  });

  describe('The setAmountPerWeek method', () => {
    it('should add value to user', () => {
      const expectValue = 10;

      const users = new User();

      users.setAmountPerWeek({
        ...defaultUser,
        weekNumber: 1,
      }, expectValue);

      expect(users.getAmountPerWeek({ ...defaultUser, weekNumber: 1 })).toBe(expectValue);
    });
  });

  describe('The calculateAmountPerWeek method', () => {
    it('should set amount per week to user when it is first amount per week', () => {
      const users = new User();

      users.calculateAmountPerWeek({
        ...defaultUser,
        weekNumber: 1,
        amount: 14,
      });

      expect(users.getAmountPerWeek({ ...defaultUser, weekNumber: 1 })).toBe(14);
    });

    it('should add amount per week when it is second amount per week', () => {
      const users = new User();

      users.calculateAmountPerWeek({
        ...defaultUser,
        weekNumber: 1,
        amount: 14,
      });

      users.calculateAmountPerWeek({
        ...defaultUser,
        weekNumber: 1,
        amount: 15,
      });

      expect(users.getAmountPerWeek({ ...defaultUser, weekNumber: 1 })).toBe(29);
    });

    it('should not change another week ', () => {
      const users = new User();

      users.calculateAmountPerWeek({
        ...defaultUser,
        weekNumber: 1,
        amount: 14,
      });

      expect(users.getAmountPerWeek({ ...defaultUser, weekNumber: 0 })).toBe(0);
    });
  });
});
