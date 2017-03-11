(function(){
  // $stateParams is a service that gives access to parameters inside url
  angular.module('MoviesApp').controller('DetailsController', function($stateParams, $q, GetDataService) {
    const movieId = $stateParams.id;

    // getting movie data by id
    $q.when(GetDataService.get('./src/data/movies.json')).then((response) => {
      const allMovies = response.data;
      allMovies.forEach((movie) => {
        if (movie.imdb === movieId) {
          this.movie = movie;
        }
      });
      // console.log(this.movie);
    }).catch((error) => {
      console.log(error);
    });
  });
})();
