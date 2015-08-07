_app.controller 'IndexController', ($scope, $log, $window, $http, $timeout)->

  $scope.lucky = {}
  $scope.errorMessage = null
  $scope.button = 'GENERATE'

  $scope.generate = ->
    $log.log 'This must be your lucky day.'
    $n = $scope.randomNumbers()
    $scope.lucky =
      a: $n[0]
      b: $n[1]
      c: $n[2]

    return

  $scope.randomNumbers = ->
    n = _.range 1, 49
    n = _.shuffle n
    n = _.slice n, 0, 3
    n

  $scope.lottery = (e)->
    e.preventDefault()
    $scope.errorMessage = null
    $scope.button = 'GENERATING ...'
    $log.log 'values', $scope.lucky
    $log.log 'form', $scope.form_lucky
    _u = _.uniq _.values $scope.lucky
    if _u.length < 3
      $scope.errorMessage = 'Every box must be unique. Try again?'
      $scope.button = 'TRY AGAIN'
    else
      $timeout $scope.generating, 1500

    return

  $scope.generating = ->
    $http
      url: 'lucky'
      data: $scope.lucky
      params:
        lottery: $scope.form_lucky.$dirty
      method: 'POST'
    .success (s)->
      $log.log s
      $scope.lucky = s
      $scope.errorMessage = null
      $scope.button = 'GENERATE'

      return
    .error (e)->
      $log.error e
      $scope.form_lucky.$dirty = false
      $log.log $scope.form_lucky
      $scope.errorMessage = e.error
      $scope.button = 'TRY AGAIN'

      return

  $scope.generate()

  return