window._app = angular.module 'App', [
  # 'ngAnimate'
  'ui.router'
  ]

window._app.config ($interpolateProvider, $animateProvider, $httpProvider)->

  $interpolateProvider.startSymbol '{#'
  $interpolateProvider.endSymbol '#}'

  $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"

  return

window._app.run ($rootScope, $state, $stateParams)->

  $rootScope.$state = $state
  $rootScope.$stateParams = $stateParams

  return

angular.element(document).ready ->

  angular.bootstrap(document, ['App'])

  return