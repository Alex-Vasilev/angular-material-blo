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
                    return domain + 'posts/' + id + '/';
                },
                deletePost: function (id) {
                    return domain + 'posts/' + id;
                }
            };
        }).
        service('authService', function (lock, authManager) {

            function login() {
                lock.show();
            }

            // Set up the logic for when a user authenticates
            // This method is called from app.run.js
            function registerAuthenticationListener() {
                lock.on('authenticated', function (authResult) {
                    localStorage.setItem('id_token', authResult.idToken);
                    authManager.authenticate();
                });
            }

            function logout() {
                localStorage.removeItem('id_token');
                authManager.unauthenticate();
            }

            return {
                login: login,
                registerAuthenticationListener: registerAuthenticationListener
            }
        });




