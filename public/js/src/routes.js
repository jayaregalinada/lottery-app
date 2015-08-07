window._app.config(function($stateProvider, $urlRouterProvider) {
  var $path;
  $path = window.location.origin + window.location.pathname;
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('index', {
    url: '/',
    controller: 'IndexController',
    templateUrl: $path + 'v/form.html'
  });
});
