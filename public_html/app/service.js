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
        service('authService', authService);

authService.$inject = ['angularAuth0', 'authManager', '$location'];

function authService(angularAuth0, authManager, $location) {

    function login(username, password, callback) {
        angularAuth0.login({
            connection: 'Username-Password-Authentication',
            responseType: 'token',
            email: username,
            password: password,
        }, callback);
    }

    function signup(username, password, callback) {
        angularAuth0.signup({
            connection: 'Username-Password-Authentication',
            responseType: 'token',
            email: username,
            password: password
        }, callback);
    }

    function googleLogin(callback) {
        angularAuth0.login({
            connection: 'google-oauth2',
            responseType: 'token'
        }, callback);
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        authManager.unauthenticate();
    }

    function authenticateAndGetProfile() {
        var result = angularAuth0.parseHash(window.location.hash);

        if (result && result.idToken) {
            localStorage.setItem('id_token', result.idToken);
            authManager.authenticate();
            angularAuth0.getProfile(result.idToken, function (error, profileData) {
                if (error) {
                    console.log(error);
                }

                localStorage.setItem('profile', JSON.stringify(profileData));
                $location.path('/');
            });
        } else if (result && result.error) {
            alert('error: ' + result.error);
        }
    }

    return {
        login: login,
        logout: logout,
        authenticateAndGetProfile: authenticateAndGetProfile,
        signup: signup,
        googleLogin: googleLogin
    }
}



