(function() {
  // setting the $q service and GetDataService as dependencies
  angular.module('MoviesApp').controller('ListController', function($q, GetDataService) {
    $q.when(GetDataService.get('./src/data/movies.json')).then((response) => {
      this.allMovies = response.data;
      // console.log(this.allMovies);
    }).catch((error) => {
      console.log(error);
    });
  });
})();
