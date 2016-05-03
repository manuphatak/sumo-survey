import angular from 'angular';
import uiRouter from 'angular-ui-router';
import SurveyServices from 'services/Survey';
import navAdmin from 'components/navAdmin';

export default angular
  .module('app.pages.done', [ uiRouter, SurveyServices.name, navAdmin.name ])
  .config(routeConfig);

/** @ngInject **/
function routeConfig($stateProvider) {
  $stateProvider
    .state('done', {
      url: '/done/',
      templateUrl: require('./done.html'),
      controller: DoneController,
      controllerAs: '$ctrl',
      resolve: {
        question: /** @ngInject **/Survey => Survey.question(),
      },
    });
}

/** @ngInject **/
function DoneController($state, question) {
  activate();

  ////////////////

  function activate() {
    if (angular.isDefined(question.text)) $state.go('survey');
  }
}
