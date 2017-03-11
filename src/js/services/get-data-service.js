(function() {
  // this service could be expanded to 'crudService' or 'httpService' to make a full http service handling all gets, posts, puts, and deletes
  // would just need to add additional functions for the different methods
  angular.module('MoviesApp').service('GetDataService', function($http) {
    function fetchData(url) {
      return $http({
        method: 'GET',
        url: url
      });
    }

    // function fetchDataById(url, id) {
    //   $http({
    //     method: 'GET',
    //     url: url
    //   }).then((response) => {
    //     const allMovies = response.data;
    //     let matchedMovie;
    //     allMovies.forEach((movie) => {
    //       if (movie.imdb === id) {
    //         matchedMovie = movie;
    //       }
    //     });
    //     console.log(matchedMovie);
    //     return matchedMovie;
    //   });
    // }

    // function putData(url) {
    //   return $http({
    //     method: 'PUT',
    //     url: url
    //   });
    // }

    return {
      get: fetchData
      // getById: fetchDataById
      // put: putData
    };
  });
})();
