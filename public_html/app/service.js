angular.module('service', []).
        service('generalItems', function () {
            var domain = 'http://localhost:3000/';
            this.option = {
                urlPosts: domain + 'posts/',
                urlPost: function (id) {
                    return domain + 'posts/' + id + '/';
                },
                addPost: domain + 'posts/',
                editCurrentPost: function (id) {
                    return domain + 'posts/' + id +'/';
                },
                deletePost:function(id){
                    return domain +'posts/'+id;
                } 
            };
        });




