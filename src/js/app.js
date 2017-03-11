(function() {
  angular.module('MoviesApp', ['ui.router']);

  angular.module('MoviesApp').config(function($stateProvider, $urlRouterProvider) {
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
