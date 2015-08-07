_app.controller('IndexController', function($scope, $log, $window, $http, $timeout) {
  $scope.lucky = {
    a: 0,
    b: 0,
    c: 0
  };
  $scope.errorMessage = null;
  $scope.button = 'GENERATE';
  $scope.generate = function() {
    $log.log('Generating ...');
  };
  $scope.lottery = function(e) {
    e.preventDefault();
    $scope.button = 'GENERATING ...';
    $log.log('values', $scope.lucky);
    $log.log('form', $scope.form_lucky);
    $timeout($scope.generating, 1000);
  };
  $scope.generating = function() {
    return $http({
      url: 'lucky',
      data: $scope.lucky,
      params: {
        lottery: $scope.form_lucky.$dirty
      },
      method: 'POST'
    }).success(function(s) {
      $log.log(s);
      $scope.lucky = s;
      $scope.errorMessage = null;
      $scope.button = 'GENERATE';
    }).error(function(e) {
      $log.error(e);
      $scope.form_lucky.$dirty = false;
      $log.log($scope.form_lucky);
      $scope.errorMessage = e.error;
      $scope.button = 'TRY AGAIN';
    });
  };
  $scope.generate();
});
