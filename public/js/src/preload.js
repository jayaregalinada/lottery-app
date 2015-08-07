window._app = angular.module('App', ['ui.router']);

window._app.config(function($interpolateProvider, $animateProvider, $httpProvider) {
  $interpolateProvider.startSymbol('{#');
  $interpolateProvider.endSymbol('#}');
  $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
});

window._app.run(function($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
});

angular.element(document).ready(function() {
  angular.bootstrap(document, ['App']);
});
