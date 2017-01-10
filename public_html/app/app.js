var app = angular.module('myApp', [
    'controllers',
    'factory',
    'service',
    'ui.router',
    'directives',
    'ui.bootstrap',
    'ngMaterial',
    'auth0.lock',
    'angular-jwt'
]);
app.run(run);
run.$inject = ['$rootScope', 'authService', 'lock'];
function run($rootScope, authService, lock) {

    $rootScope.authService = authService;

    // Register the authentication listener that is
    // set up in auth.service.js
    authService.registerAuthenticationListener();

    // Register the synchronous hash parser
    // when using UI Router
    lock.interceptHash();
}

app.config(function ($stateProvider, lockProvider, $urlRouterProvider, $mdThemingProvider) {
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
            });
    lockProvider.init({
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
});