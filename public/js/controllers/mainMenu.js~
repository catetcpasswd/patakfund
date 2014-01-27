angular.module('mean.system').controller('HeaderController', ['$scope', '$location', 'Global', '$window', function ($scope, $location, Global, $window) {
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
    
}]);
