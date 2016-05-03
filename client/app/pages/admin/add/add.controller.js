import angular from 'angular';
import uiRouter from 'angular-ui-router';
import lbServices from 'client/lbServices';

export default angular
  .module('app.pages.admin.add.controller', [ uiRouter, lbServices ])
  .controller('AddController', AddController);

/** @ngInject **/
function AddController($log, $state, $q, Question) {
  const $ctrl = this;

  ////////////////

  $ctrl.addChoice = (choice, question) => {
    if (!question.choices) question.choices = [];
    if (!choice) return;
    if (question.choices.includes(choice)) return;

    question.choices.push(angular.copy(choice));
    question.addChoice.text = '';
  };

  $ctrl.addQuestion = question => {
    if (question.$invalid || question.addChoice.text.length || !question.choices.length) return;
    const { text, choices } = question;
    $log.debug('AdminController choices:', choices);

    Question.create({ text, choices })
      .$promise
      .then(results => {
        $state.reload();
        return results;
      })
      .catch(error => {
        $log.error('AddController error: %s\n', error.data.error.message, error);
        return $q.reject(error);
      });
  };
}