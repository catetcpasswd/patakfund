

angular.module('mean.system')
    .controller('AccountFormController', ['$scope', '$http','$location', '$window','Global', 'Languages', 'Timezones', function ($scope, $http, $location, $window, Global, Languages, Timezones  ) {

        $scope.getDefault = function() { 

            $scope.global = Global;  

            $scope.window = $window;
            

            // this works using $http('/getData/states')
            // use a factory called States2 to get data from $http
            Languages.getData().then(function(data) {
                $scope.languagesData = data;
            });

            Timezones.getData().then(function(data) {
                $scope.timezonesData = data;
            });
            

            // initialize values from mongo
            $http.get('/user/account/' + Global.user.email)
                  .success(function(account) {
                      $scope.account = account;
                    
                })
                .error(function(data){
                    console.log("error in getting account");
                    $scope.window.location = '/';
                      
            }); 
      
           
        };

        // validate username for uniqueness... directive?
        
          // this code displays the 
        $scope.timeZoneOptions = {
            ajax: {
                url: "http://gomashup.com/json.php?fds=geo/timezone/locations&jsoncallback=?",
                dataType: 'json',
                data: function (term, page) {
                    return {};
                },
                results: function (data,page) {
                    console.log('timezoneoptions ' + data.results);
                    var more = (page * 10) < data.total;
                    return {results:data.results, more:more};
                }
            },
            // this thing works! it displays the default value chosen. see above
            initSelection: function(element, callback) {
                callback($(element).data('$ngModelController').$modelValue);
            }
        };  

       
        $scope.updateAccount = function () {
      
            console.log("ng-submit updateMobile");
     
            console.log('Username     : ' + ($scope.account.username)); 
            console.log('Language     : ' + ($scope.account.language));
            console.log('Timezone     : ' + ($scope.account.timezone)); 

            // validation for unique username could also be here
        
           
            // must pass $scope.reset and not individual values else error 500
            console.log("about to $http.post /user/account");
             
            $http.post('/user/account/' + Global.user.email, $scope.account)
                .success(function(data) {
                    console.log("Success. back from /user/profile");

                    
                    $scope.window.location = '/profile';

                    console.log("after to $scope.$apply");
                  
              })
              .error(function(data){
                  console.log("error in saving profile");

                      
                      $scope.window.location = '/account';
                    
            }); 
           

        };  // $scope.updateProfile

    }])
    .directive('uniqueUsername', ['$http', 'Global', function($http, Global) {  
        return {
          require: 'ngModel',
          link: function(scope, elem, attrs, ctrl) {
            scope.busy = false;
            scope.$watch(attrs.ngModel, function(value) {
              
              // hide old error messages
              ctrl.$setValidity('isTaken', true);
              ctrl.$setValidity('invalidChars', true);
              
              if (!value) {
                // don't send undefined to the server during dirty check
                // empty username is caught by required directive
                return;
              }
              
              console.log('inside uniqueUsername directive ' + value + ' email: ' + Global.user.email);
              scope.busy = true;
              $http.post('/validate/username/' + Global.user.email, {username: value})
                .success(function(data) {
                    console.log('Success. username ' + value + ' is AVAILABLE');
                    // everything is fine -> do nothing
                    scope.busy = false;
                })
                .error(function(data) {
                    console.log('ERROR. username ' + value + ' is USED');
                    ctrl.$setValidity('isTaken', false);
                    scope.busy = false;
                });
            });
          }
        };
    }]);



