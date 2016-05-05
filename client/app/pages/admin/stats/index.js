import angular from 'angular';
import uiRouter from 'angular-ui-router';
import StatsService from 'services/Stats';
import uiBootstrapAccordion from 'angular-ui-bootstrap/src/accordion';
import barchart from 'components/barchart';
import question from './question';

const MODULE_NAME = 'app.page.admin.results';
export default MODULE_NAME;

angular
  .module(MODULE_NAME, [ uiRouter, uiBootstrapAccordion, barchart, question, StatsService ])
  .config(routeConfig);

/** @ngInject **/
function routeConfig($stateProvider) {
  $stateProvider
    .state('admin.stats', {
      url: 'stats/',
      templateUrl: require('./stats.html'),
      controller: ResultsController,
      controllerAs: '$ctrl',
      resolve: {
        questions: /** @ngInject **/Stats => Stats.summary(),
      },
    });
}

/** @ngInject **/
function ResultsController($log, $scope, $state, questions) {
  const $ctrl = this;
  $ctrl.questions = questions;
  activate();

  ////////////////

  function activate() {
  }

  ////////////////

  $ctrl.showQuestion = ({ id }) => {
    $scope.$apply(() => {
      $state.go('admin.stats.question', { id });
    });
  };
}

