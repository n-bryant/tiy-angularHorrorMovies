'use strict';

(function () {
  angular.module('MoviesApp', ['ui.router']);

  angular.module('MoviesApp').config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('MoviesParent', {
      url: '/',
      abstract: true, // lets angular and ui-router know this state is going to change child states
      template: '<ui-view></ui-view' // any child state is going to be rendered in the ui-view tag
    }).state('MoviesParent.index', { // setting default index state
      url: '', // passing an empty url string looks for a state named index
      templateUrl: './templates/home.html'
    }).state('MoviesParent.list', {
      url: 'movie-list',
      templateUrl: './templates/movie-list.html',
      controller: 'ListController as listCtrl'
    }).state('MoviesParent.details', {

      // you can pass multiple dynamic parameters into urls
      // colon notation sets this up to receive dynamic ids like movie-details/2
      url: 'movie-details/:id/comments/:commentId',
      templateUrl: './templates/movie-details.html',
      controller: 'DetailsController as detailsCtrl'
    });
  });
})();
'use strict';

(function () {
  // $stateParams is a service that gives access to parameters inside url
  angular.module('MoviesApp').controller('DetailsController', function ($stateParams, $q, GetDataService) {
    var _this = this;

    var movieId = $stateParams.id;

    // getting movie data by id
    $q.when(GetDataService.get('./src/data/movies.json')).then(function (response) {
      var allMovies = response.data;
      allMovies.forEach(function (movie) {
        if (movie.imdb === movieId) {
          _this.movie = movie;
        }
      });
      // console.log(this.movie);
    }).catch(function (error) {
      console.log(error);
    });
  });
})();
'use strict';

(function () {
  // setting the $q service and GetDataService as dependencies
  angular.module('MoviesApp').controller('ListController', function ($q, GetDataService) {
    var _this = this;

    $q.when(GetDataService.get('./src/data/movies.json')).then(function (response) {
      _this.allMovies = response.data;
      // console.log(this.allMovies);
    }).catch(function (error) {
      console.log(error);
    });
  });
})();
'use strict';

(function () {
  // this service could be expanded to 'crudService' or 'httpService' to make a full http service handling all gets, posts, puts, and deletes
  // would just need to add additional functions for the different methods
  angular.module('MoviesApp').service('GetDataService', function ($http) {
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