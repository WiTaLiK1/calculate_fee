const uniqBy = require('lodash/uniqBy');
const FeeConfig = require('./FeeConfig');

class CashOutFeeConfig extends FeeConfig {
  /**
   * Get name by type and userType
   *
   * @param {string} type
   * @param {string} userType
   * @returns {string}
   */
  static getName({ type, userType }) {
    return CashOutFeeConfig.typesToUrl([type, userType]);
  }

  /**
   * Get config by type and userType
   *
   * @param {string} type
   * @param {string} userType
   * @returns {Object}
   */
  getFeeConfig({ type, userType }) {
    const name = CashOutFeeConfig.getName({ type, userType });

    return this.getConfig(name);
  }

  /**
   * Get names by data.
   *
   * @param {Array<{type: string, user_type: string}>} data
   * @returns {string[]}
   */
  static getAllNames(data) {
    const filtered = data.filter(({ type }) => type === 'cash_out');

    return uniqBy(filtered, 'user_type').map(({ type, user_type: userType }) => CashOutFeeConfig.getName({ type, userType }));
  }

  /**
   * Prefetch configs by data.
   *
   * @param {Object[]} data
   * @returns {Promise<void>}
   */
  async prefetchData(data) {
    const names = CashOutFeeConfig.getAllNames(data);

    await this.getAllConfigs(names);
  }
}

module.exports = CashOutFeeConfig;
