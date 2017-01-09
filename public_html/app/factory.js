angular.module('factory', []).
        factory('postRestApiFactory', function ($http, generalItems) {
            return{
                getPosts: function () {
                    return $http({
                        method: "GET",
                        url: generalItems.option.urlPosts,
                        headers: {
                            'Content-Type': 'application/json; charset = UTF-8'
                        }
                    });
                },
                getPost: function (id) {
                    return $http({
                        method: 'GET',
                        url: generalItems.option.urlPost(id)
                    });
                },
                setPost: function (post) {
                    return $http({
                        method: 'POST',
                        url: generalItems.option.addPost,
                        data: post                       
                    });
                },
                editCurrentPost: function (post,id) {
                    return $http({
                        method: 'PUT',
                        url: generalItems.option.editCurrentPost(id),
                        data: post
                    });
                },
                deletePost: function (id) {
                    return $http({
                        method: 'DELETE',
                        url: generalItems.option.deletePost(id)                        
                    });
                }
            };
        });


