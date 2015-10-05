var app = angular.module('ssnoc',['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'login.html',
                controller  : 'mainController'
            })

            // // route for the about page
            // .when('/about', {
            //     templateUrl : 'pages/about.html',
            //     controller  : 'aboutController'
            // })

            // // route for the contact page
            // .when('/contact', {
            //     templateUrl : 'pages/contact.html',
            //     controller  : 'contactController'
            // });
    }]);