import angular from 'angular';
import uiRouter from 'angular-ui-router';
import well from 'components/well';
import showErrors from 'components/showErrors';
import navHome from 'components/navHome';
import AuthService from 'services/Auth';

const MODULE_NAME = 'app.pages.login';
export default MODULE_NAME;

angular
  .module(MODULE_NAME, [ uiRouter, well, showErrors, AuthService, navHome ])
  .config(routeConfig);

/** @ngInject **/
function routeConfig($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login/?next',
      templateUrl: require('./login.html'),
      controller: LoginController,
      controllerAs: '$ctrl',
      authenticate: false,
    });
}

/** @ngInject **/
function LoginController($state, $stateParams, Auth) {
  const $ctrl = this;
  $ctrl.next = $stateParams.next || 'admin';

  $ctrl.login = form => {
    if (form.$invalid) return;
    Auth.login(form)
      .then(result => {
        $state.go($ctrl.next);
        return result;
      });
  };
}
