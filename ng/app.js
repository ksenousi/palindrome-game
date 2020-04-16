// eslint-disable-next-line no-undef
const app = angular.module('app', []);

app.controller('GameController', ($scope, GameService) => {
  $scope.submitEntry = () => {
    if (typeof $scope.name === 'undefined' || typeof $scope.word === 'undefined') {
      return;
    }
    const entry = {
      name: $scope.name,
      word: $scope.word,
    };
    GameService.submitEntry(entry)
      .success((points) => {
        $scope.word = undefined;
        GameService.getScores()
          .success((scores) => {
            $scope.scores = scores;
          });
      });
  };

  GameService.getScores()
    .success((scores) => {
      $scope.scores = scores;
    });
});

app.service('GameService', ($http) => {
  this.getScores = () => $http.get('/api/getScores');
  this.submitEntry = (entry) => $http.post('/api/submitEntry', entry);
});
