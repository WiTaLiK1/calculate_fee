class Users {
  constructor() {
    this.all = {};
  }

  /**
   * @param {number} userId
   * @returns {Object}
   */
  getUserById(userId) {
    this.all[userId] ??= {};
    return this.all[userId];
  }

  /**
   * Get user by userId and type
   * @param {number} userId
   * @param {string} type
   * @returns {Object} {*}
   */
  getUser({ userId, type }) {
    const user = this.getUserById(userId);

    user[type] ??= {
      amountWeek: {},
    };
    return user[type];
  }

  /**
   * @param {number} userId
   * @param {string} type
   * @param {number} weekNumber
   * @returns {number}
   */
  getAmountPerWeek({ userId, type, weekNumber }) {
    const user = this.getUser({ userId, type });

    return user.amountWeek[weekNumber] || 0;
  }

  /**
   * @param {number} userId
   * @param {string} type
   * @param {number} weekNumber
   * @param {number} value
   */
  setAmountPerWeek({ userId, type, weekNumber }, value) {
    const user = this.getUser({ userId, type });

    user.amountWeek[weekNumber] = value;
  }

  /**
   * @param {number} userId
   * @param {string} type
   * @param {number} amount
   * @param {number} weekNumber
   */
  calculateAmountPerWeek({
    userId,
    type,
    amount,
    weekNumber,
  }) {
    const amountWeek = this.getAmountPerWeek({ userId, type, weekNumber });

    this.setAmountPerWeek({ userId, type, weekNumber }, amountWeek + amount);
  }
}

module.exports = Users;
