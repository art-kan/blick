class TranslatableString {
  /**
   * @param {Object.<string, string>} dict
   */
  constructor(dict) {
    this.defaultLang = dict['_default'] || Object.keys(dict)[0];

    if (this.defaultLang == null) throw Error('Empty dictionary');

    delete dict['_default'];
    this.dictionary = dict;
  }

  /**
   * @param [string] lang
   */
  translate(lang) {
    return this.dictionary[lang] || this.dictionary[this.defaultLang];
  }
}

exports.TranslatableString = TranslatableString;
