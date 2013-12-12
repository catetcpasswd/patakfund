//Setting up route 
// added check to prevent users from accessing unauthorized areas

window.app.config(['$routeProvider',
    function($routeProvider, $locationProvider) {

        // console.log('routeProvider');

        $routeProvider.
        //when('/about', {
        //    templateUrl: 'views/about2.html'
        //}).
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
        when('/contact', {
            templateUrl: 'views/contacts/list.html'
        }).
        when('/modal', {
            templateUrl: 'views/modal.html'
        }).
        when('/welcome', {
            templateUrl: 'views/welcome.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]).run(function($logincheck,$rootScope, $location) {
    // $logincheck is init in js/services/global.js
    // makes sure that the user who is not logged in is not allowed into certain areas
    
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        //console.log("$rootScope.$on and loginCheck: " + $logincheck);
        if($logincheck === false) {
            $location.path('/');
        }         
    });   
});

// code above is from jigal patel and st. never
// but does not redirect sometimes

//Setting HTML5 Location Mode
window.app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);

/*
//get rid of the # 
window.app.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
});
*/
