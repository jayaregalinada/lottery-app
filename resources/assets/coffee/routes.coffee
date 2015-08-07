## Dashboard Routes
window._app.config ( $stateProvider, $urlRouterProvider )->
  $path = window.location.origin + window.location.pathname
  $urlRouterProvider.otherwise '/'

  $stateProvider
    .state 'index',
      url: '/'
      controller: 'IndexController'
      templateUrl: $path + 'v/form.html'

  return