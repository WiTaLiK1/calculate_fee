const FeeConfig = require('./FeeConfig');

class CashInFeeConfig extends FeeConfig {
  /**
   * Get name by type
   *
   * @param {string} type
   * @returns {string}
   */
  static getName({ type }) {
    return CashInFeeConfig.typesToUrl([type]);
  }

  /**
   * Get config by type
   *
   * @param {string} type
   * @returns {Object}
   */
  getFeeConfig({ type }) {
    const name = CashInFeeConfig.getName({ type });

    return this.getConfig(name);
  }

  /**
   * Get names by data.
   *
   * @param {Array<{type: string}>} data
   * @returns {string[]}
   */
  static getAllNames(data) {
    const hasCashInType = Boolean(data.find(({ type }) => type === 'cash_in'));

    if (hasCashInType) {
      return [CashInFeeConfig.getName({ type: 'cash_in' })];
    }
    return [];
  }

  /**
   * Prefetch configs by data.
   *
   * @param {Object[]} data
   * @returns {Promise<void>}
   */
  async prefetchData(data) {
    const names = CashInFeeConfig.getAllNames(data);

    await this.getAllConfigs(names);
  }
}

module.exports = CashInFeeConfig;
