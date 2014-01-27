angular.module('mean.system').
controller('MenuController', ['$scope', '$location', 'Global', '$window',  function ($scope, $location, Global, $window) {
    $scope.global = Global;
    //$scope.window = $window;

    $scope.menu = [
        {
            "title": "Contact Manager",
            "link": "contact"
        },  
        {
            "title": "Modal",
            "link": "modal"
        },
        {
            "title": "Account",
            "link": "account"
        },
        {
            "title": "Profile",
            "link": "profile"
        },
        {
            "title": "Password",
            "link": "password"
        },
        {
            "title": "Edit Forms",
            "link": "editrec"
        },
        {
            "title": "Mobile",
            "link": "mobile"
        }
    
    ];

    if(Global.user) {
        console.log('Header Controller ' + Global.user.name); 
        //$scope.window.location = '/#!/welcome';
        var url = '/welcome';
        var force = false;
        $location.path(url);

        $scope = $scope || angular.element(document).scope();
        if(force || !$scope.$$phase) {
            //this will kickstart angular if to notice the change
            $scope.$apply();
        } 
    }
    else {
        console.log('User is not logged in'); 
    } 
    
}]) 

.config([ '$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', 
            {
                url: '/about',
                templateUrl: '../app/views/about/about.html'
            },
            {
                url: '/contact',
                templateUrl: 'views/contacts/list.html'
            },
            {
                url: '/modal',
                templateUrl: 'views/modal.html'
            },
            {
                url: '/account',
                templateUrl: 'views/profile/account.html'
            },
            {
                url: '/profile',
                templateUrl: 'views/profile/profile.html'
            },
            {
                url: '/password',
                templateUrl: 'views/profile/password.html'
            },
            {
                url: '/mobile',
                templateUrl: 'views/profile/mobile.html'
            },
            {
                url: '/editrec',
                templateUrl:  'views/testing/editform.html'
            },
            {
                url: '/welcome',
                templateUrl:  'views/welcome.html'
            },
            {
                url: '/',
                templateUrl:  'views/index.html'
            }

            ) 
        ;


    }])

 
;
