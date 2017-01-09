angular.module('directives', []).
        directive('appHeader', function () {
            return{
                templateUrl: 'layouts/header.html',
                controller: 'HeaderCtrl'
            };
        }).
        directive('appFooter', function () {
            return{
                templateUrl: 'layouts/footer.html',
                controller: 'FooterCtrl'
            };
        }).
        filter('startFrom', function () {
            return function (data, start) {
                return data.slice(start);
            };
        })


