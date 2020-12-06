const assert = require('assert').strict;
const { TranslatableString } = require('./translatable_string');
const { isExpr } = require('./expr');

/** Question[] */
const questions = [];

const typesMap = {};

class Question {


  /**
   * @param {object} data
   */
  constructor(data) {
    assert.equal(typeof data['id'], 'string');
    assert.equal(typeof data['n'], 'number');
    assert.equal(typeof data['type'], 'string');

    if (data['q'] == null) throw Error('`q` is not provided');
    if (data['a'] == null) throw Error('`a` is not provided');

    this.id = data.id;
    this.n = data.n;
    this.type = data.type;
    this.q = new TranslatableString(data['q']);

    if (data['condition'] && !isExpr(data['condition'])) throw Error('Bad Expr for condition');

    this.condition = data['condition'] || null;
  }

  /**
   * Retrives questions from questions.json file in the project root directory.
   */
  static async load() {
    const json = require('../questions.json');

    for (const question of json) {
      questions.push(new typesMap[question.type](question));
    }

    questions.sort((a, b) => a.n > b.n);
  }

  static async getRawQuestions() {
    return require('../questions.json');
  }

  static async getQuestions() {
    return questions;
  }

  static parseResponse(data) {
    const response = {};
    const context = {
      answers: response,
    };

    for (const question of questions) {
      context.current = question.id;

      const answer = data[question.id];
      if (!question.validate(answer, context)) return null;
      response[question.id] = answer;
    }

    return response;
  }

  validate() {
    throw Error('Not implemented yet');
  }
}

exports.Question = Question;

typesMap['options'] = require('./question-with-options').QuestionWithOptions;
