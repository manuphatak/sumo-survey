const _ = require('lodash');
const loopback = require('loopback');

module.exports = Question => {
  Question.validatesPresenceOf('text');
  Question.validatesLengthOf('text', { max: 512 });
  Question.createWithChoices = createWithChoices;
  Question.statsSummary = statsSummary;
  Question.prototype.statsQuestion = statsQuestion;

  /**
   * Create a new Question with Choices and persist it into the data source.
   * @param {[question]|question} data Model instance data
   * @return {Promise.<[question]|question>}
   */
  function createWithChoices(data) {
    const ctx = loopback.getCurrentContext();
    // noinspection JSAccessibilityCheck
    const currentUser = ctx.get('currentUser');
    if (!currentUser) return Promise.reject(new Error('Current User not found in current context'));
    // normalize input to array
    return _.isArray(data) ? createMany(data) : createOne(data);

    function createMany(dataItems) {
      // for each data item ...
      return Promise.all(dataItems.map(createOne));
    }

    function createOne(dataItem) {
      // pop choices
      const choices = _.isFunction(dataItem.choices) ? dataItem.choices() : dataItem.choices;
      delete dataItem.choices;
      dataItem.creatorId = currentUser.id;

      // create question
      return Question.create(dataItem)
        // add choices to question ...
        .then(question => {
          // Guard, no choices
          if (!choices || !choices.length) return question;

          // create choices
          return question.choices.create(choices)
            // return original question
            .then(() => question);
        });
    }
  }

  /**
   * Get response count by question
   * @param {object} [filter] Filter defining fields, where, include, order, offset, and limit
   * @return {Promise.<[question]>} Questions including response count
   */
  function statsSummary(filter = {}) {
    return Question.find(filter)
      .then(questions => Promise.all(questions.map(question => question.responses.count()
        .then(count => Object.assign(question.toObject(), { count }))
      )));
  }

  /**
   * Get response count by choice
   * @param {object} [filter] Filter defining fields, where, include, order, offset, and limit
   * @return {Promise.<question>} Question including response count by choice
   */
  function statsQuestion(filter = {}) {
    const question = this;
    return getChoices(question, filter)
      .then(choices => Promise.all(choices.map(choice => choice.responses.count()
        .then(count => Object.assign(choice.toObject(), { count }))
      )))
      .then(choices => Object.assign(question.toObject(), { choices }));
  }
};

/**
 * Get questions' choices
 * @param {object} question instance
 * @param {object} filter
 * @returns {Promise.<[choice]>}
 */
function getChoices(question, filter = {}) {
  return new Promise((resolve, reject) => {
    question.choices(filter, (err, choices) => (err ? reject(err) : resolve(choices)));
  });
}
