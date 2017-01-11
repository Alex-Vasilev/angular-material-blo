var app = angular.module('myApp', [
    'controllers',
    'factory',
    'service',
    'ui.router',
    'directives',
    'ui.bootstrap',
    'ngMaterial',
//    'auth0.lock',
    'angular-jwt', 
    'auth0.auth0'
]);
app.config(config);
config.$inject = ['$stateProvider', 'angularAuth0Provider', '$urlRouterProvider', '$mdThemingProvider'];
function config ($stateProvider, angularAuth0Provider, $urlRouterProvider, $mdThemingProvider) {
    $stateProvider.
            state('app', {
                url: '/app',
                templateUrl: 'templates/appBody.html',
                controller: 'AppBodyCtrl',
                resolve: {
                    myResolve: function ($q, postRestApiFactory) {
                        var defer = $q.defer();
                        postRestApiFactory.getPosts().success(function (data) {
                            defer.resolve(data);
//                            console.log('a');
                        }).error(function (data) {
                            defer.reject(data);
                        });
                        return defer.promise;
                    }
                },
                controllerAs: 'vm'
            }).
            state('app.posts', {
                url: '/posts',
                templateUrl: 'templates/posts.html',
                controller: 'PostsCtrl'
//                resolve: {
//                    myResolve: function ($q, postRestApiFactory) {
//                        var defer = $q.defer();
//                        postRestApiFactory.getPosts().success(function (data) {
//                            defer.resolve(data);
////                            console.log('a');
//                        }).error(function (data) {
//                            defer.reject(data)
//                        });
//                        return defer.promise;
//                    }
//                }
            }).
            state('app.post', {
                url: '/post/{id}',
                templateUrl: 'templates/post.html',
                controller: 'PostCtrl'
            })
                  .state('home', {
        url: '/home',
        controller: 'HomeController',
        templateUrl: 'templates/home.html',
        controllerAs: 'vm'
      })
            .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'templates/login.html',
        controllerAs: 'vm'
      });;
    angularAuth0Provider.init({
        clientID: '5CxFp5mFQgCfXwxSJLiSuEfzMECxDHTu',
        domain: 'alex-vasilev.eu.auth0.com'
    });
    $urlRouterProvider.otherwise('/app/posts');
    $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow', {
                'default': '300'
//      'hue-1': '400'
            })
            .warnPalette('red', {
                'default': '300'
            })
            .dark();
};


app.run(function ($rootScope, authService) {

      // Put the authService on $rootScope so its methods
      // can be accessed from the nav bar
      $rootScope.authService = authService;

      // Process the auth token if it exists and fetch the profile
      authService.authenticateAndGetProfile();
    });