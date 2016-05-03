import angular from 'angular';
import uiRouter from 'angular-ui-router';
import navAdmin from 'components/navAdmin';

export default angular
  .module('app.pages.home', [ uiRouter, navAdmin.name ])
  .config(routeConfig);

/** @ngInject **/
function routeConfig($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: require('./home.html'),
      controller: HomeController,
      controllerAs: '$ctrl',
    });
}

/** @ngInject **/
function HomeController() {
}
