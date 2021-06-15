const api = require('../../services/api');

class FeeConfig {
  constructor() {
    this.all = {};
  }

  /**
   * Get config by name
   *
   * @param {string} name
   * @returns {Object}
   */
  getConfig(name) {
    return this.all[name];
  }

  /**
   * Set config by name
   *
   * @param {string} name
   * @param {Object} value
   */
  setConfig(name, value) {
    this.all[name] = value;
  }

  /**
   * Generate array names from types
   *
   * @param {string[]} arrayValues
   * @returns {string}
   */
  static typesToUrl(arrayValues) {
    return arrayValues
      .map((value) => value.replace(/_/g, '-'))
      .join('-');
  }

  /**
   * Get config by name. If is empty fetch it from api.
   *
   * @param {string} name
   * @returns {Promise<Object>}
   */
  async getConfigByName(name) {
    let config = this.getConfig(name);

    if (!config) {
      config = await api(name);
      this.setConfig(name, config);
    }

    return config;
  }

  /**
   * Get configs by names
   *
   * @param {string[]} names
   * @returns {Promise<Object[]>}
   */
  getAllConfigs(names) {
    return Promise.all(names.map((name) => this.getConfigByName(name)));
  }
}

module.exports = FeeConfig;
