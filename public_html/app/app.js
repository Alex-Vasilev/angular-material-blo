var app = angular.module('myApp', [
    'controllers',
    'factory',
    'service',
    'ui.router',
    'directives',
    'ui.bootstrap',
    'ngMaterial'
]);
app.config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
    $stateProvider.
            state('app', {
                url: '/app',
                templateUrl: 'templates/appBody.html',
                controller: 'AppBodyCtrl',
                                resolve:{
                    myResolve: function($q, postRestApiFactory){
                        var defer = $q.defer();
                        postRestApiFactory.getPosts().success(function(data){
                            defer.resolve(data);
//                            console.log('a');
                        }).error(function(data){defer.reject(data)});
                        return defer.promise;
                    }
                }
            }).
            state('app.posts', {
                url: '/posts',
                templateUrl: 'templates/posts.html',
                controller: 'PostsCtrl',
                resolve:{
                    myResolve: function($q, postRestApiFactory){
                        var defer = $q.defer();
                        postRestApiFactory.getPosts().success(function(data){
                            defer.resolve(data);
//                            console.log('a');
                        }).error(function(data){defer.reject(data)});
                        return defer.promise;
                    }
                }
            }).
            state('app.post', {
                url: '/post/{id}',
                templateUrl: 'templates/post.html',
                controller: 'PostCtrl'
            });
    $urlRouterProvider.otherwise('/app/posts');
        $mdThemingProvider.theme('docs-dark', 'default')
          .primaryPalette('yellow', {
      'default': '300',
//      'hue-1': '400'
    })
         .warnPalette('red', {
      'default': '300'
    })
      .dark();
});