const { Question } = require('./question');
const { TranslatableString } = require('./translatable_string');
const { evalExpr } = require('./expr');

class QuestionWithOptions extends Question {
  /**
   * @param {object} data
   */
  constructor(data) {
    super(data);

    if (data['a'] == null) throw Error('`a` is not provided');
    this.a = QuestionWithOptions.parseAnswers(data['a']);
  }

  /**
   * @param {object} setetings
   */
  static parseAnswers(settings) {
    const a = {};
    for (const prop in settings.options) {
      const option = parseInt(prop);
      if (typeof option !== 'number') throw Error('Invalid settings');
      a[option] = new TranslatableString(settings.options[prop]);
    }
    return a;
  }

  validate(value, context) {
    if (this.condition && !evalExpr(this.condition, context)) return value == null;
    if (!(value in this.a)) return false;
    return true;
  }
}

exports.QuestionWithOptions = QuestionWithOptions;
