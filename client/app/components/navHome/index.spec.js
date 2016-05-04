/* eslint-env angular/mocks, jasmine */
import NavHomeComponent from './';
const { beforeEach } = global;

describe('NavHome Component', () => {
  let element;
  let $scope;

  beforeEach(window.module(NavHomeComponent.name)); // eslint-disable-line angular/window-service

  beforeEach(() => {
    let $compile;
    let $rootScope;

    inject((_$compile_, _$rootScope_) => {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new(true);

      element = $compile('<app-nav-home></app-nav-home>')($scope);
      $scope.$digest();
    });
  });

  describe('Component', () => {
    it('Should exist with class ng-scope', () => {
      expect(element[ 0 ].classList.contains('ng-scope')).toBeTruthy();
    });

    it('Should exist with class ng-isolate-scope', () => {
      expect(element[ 0 ].classList.contains('ng-isolate-scope')).toBeTruthy();
    });
  });

  describe('Controller', () => {
    let $ctrl;

    beforeEach(() => {
      $ctrl = element.controller('appNavHome');
    });

    it('Should exist', () => {
      expect(typeof $ctrl).toBe('object');
    });
  });
});
