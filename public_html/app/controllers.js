angular.module('controllers', []).
        controller('MainCtrl', function ($scope) {
        }).
        controller('AppBodyCtrl', function (authService, $scope, $state, $uibModal) {
            var vm = this;
            vm.authService = authService;

            $scope.logIn = function () {
                $scope.addNewPostModal = $uibModal.open({
                    templateUrl: 'templates/login.html',
                    scope: $scope,
                    size: 'md',
                    animation: true
                });
            };

            vm.login = function () {
                // Show loading indicator
                vm.message = 'loading...';
                vm.loading = true;
                authService.login(vm.user, vm.pass, function (err) {
                    if (err) {
                        vm.message = "something went wrong: " + err.message;
                        vm.loading = false;
                    }
                });
            };

            vm.signup = function () {
                // Show loading indicator
                vm.message = 'loading...';
                vm.loading = true;
                authService.signup(vm.user, vm.pass, function (err) {
                    if (err) {
                        vm.message = "something went wrong: " + err.message;
                        vm.loading = false;
                    }
                });
            };

            vm.googleLogin = function () {
                vm.message = 'loading...';
                vm.loading = true;

                authService.googleLogin(function (err) {
                    if (err) {
                        vm.message = "something went wrong: " + err.message;
                        vm.loading = false;
                    }
                });
            };

            authService.getProfileDeferred().then(function (profile) {
                vm.profile = profile;
            });
        }).
        controller('AppHeader', function ($scope) {
        }).
        controller('AppFooter', function ($scope) {
        }).
        controller('PostsCtrl', function ($scope, myResolve, $state, $uibModal, postRestApiFactory) {
            $scope.posts = myResolve;
            console.log($scope.posts)
            $scope.postInfo = function (id) {
                $state.go('app.post', {id: id});
            };

            $scope.openPostModal = function () {
                $scope.addNewPostModal = $uibModal.open({
                    templateUrl: 'templates/addNewPost.html',
                    scope: $scope,
                    size: 'lg',
                    animation: true
                });
            };

            $scope.ok = function (post) {
                postRestApiFactory.setPost(post).success(function (data) {
                    $scope.posts.push(data);
                    $scope.addNewPostModal.close();
                }).error(function (data) {
                    console.log(data);
                });
            };

//            pagination
            $scope.totalItems = $scope.posts.length;
            $scope.pageSize = 9;
            $scope.currentPage = 1;

//            edit
            $scope.openEditModal = function (post, index) {
                $scope.currentPost = post;
                $scope.currentPost.index = index;
                $scope.editPostModal = $uibModal.open({
                    templateUrl: "templates/editPost.html",
                    scope: $scope,
                    size: "lg"
                });
            };

            $scope.editPost = function (post) {
                postRestApiFactory.editCurrentPost(post, $scope.currentPost.id).
                        success(function (data) {
                            $scope.posts[$scope.currentPost.index] = data;
                            console.log(data);
                            $scope.editPostModal.close();
                        });
            };

            $scope.openDeletePostModal = function (index, id) {
                $scope.delIndex = index;
                $scope.delId = id;
                $scope.deletePostModal = $uibModal.open({
                    templateUrl: "templates/deletePost.html",
                    scope: $scope,
                    size: "sm"
                });
            };

            $scope.deletePost = function (id) {
                postRestApiFactory.deletePost($scope.delId).
                        success(function () {
                            $scope.posts.splice($scope.delIndex, 1);
                            $scope.deletePostModal.close();
                        }).error(function (data) {
                    console.log(data);
                })
            };

            $scope.categoryIncludes = [];

            $scope.includeCategory = function (category) {
                var i = $.inArray(category, $scope.categoryIncludes);
                if (i > -1) {
                    $scope.categoryIncludes.splice(i, 1);
                } else {
                    $scope.categoryIncludes.push(category);
                }
            };

            $scope.categoryFilter = function (posts) {
                if ($scope.categoryIncludes.length > 0) {
                    if ($.inArray(posts.category, $scope.categoryIncludes) < 0)
                        return;
                }
                return posts;
            };

//            $scope.filter = {};
////
////                // Functions - Public
////                self.filterById = filterById;
////                self.getCategories = getCategories;
////
////                // Functions - Definitions
//             $scope.filterById =  function(post) {
//                    return $scope.filter[post.category] || noFilter($scope.filter);
//                }
//
//              $scope.getCategories =  function(){
//                    return ($scope.posts || []).
//                            map(function (post) {
//                                return post.category;
//                            }).
//                            filter(function (cat, idx, arr) {
//                                return arr.indexOf(cat) === idx;
//                            });
//                }
//
//                function noFilter(filterObj) {
//                    return Object.
//                            keys(filterObj).
//                            every(function (key) {
//                                return !filterObj[key];
//                            });
//                }

        }).
        controller('PostCtrl', function ($scope, $stateParams, postRestApiFactory) {
            $scope.postInfo = {};
            postRestApiFactory.getPost($stateParams.id).
                    success(function (data) {
                        $scope.postInfo = data;
                    });
        });
