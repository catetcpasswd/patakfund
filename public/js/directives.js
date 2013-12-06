
//var app = angular.module('mean', []);


// http://stackoverflow.com/questions/12864887/angularjs-integrating-with-server-side-validation

/*
window.app.directive('validateUsername', function() {  
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      scope.busy = false;
      scope.$watch(attrs.ngModel, function(value) {
        
        // hide old error messages 
        ctrl.$setValidity('invalidChars', true);
        
        if (!value) {
          // don't send undefined to the server during dirty check
          // empty username is caught by required directive
          return;
        }
        
        if (value !== encodeURIComponent(value)) {
          ctrl.$setValidity('invalidChars', false);
          return;       
        }
        
      });
    }
  };
});
*/

/*
window.app.directive('uniqueUsername', ['$http', function($http) {  
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
        
        scope.busy = true;
        $http.post('/signup/check/username', {username: value})
          .success(function(data) {
            // everything is fine -> do nothing
            scope.busy = false;
          })
          .error(function(data) {
            
            // display new error message
            if (data.isTaken) {
              ctrl.$setValidity('isTaken', false);
            } else if (data.invalidChars) {
              ctrl.$setValidity('invalidChars', false);
            }

            scope.busy = false;
          });
      });
    }
  };
}]);
*/

/*
window.app.directive('uniqueEmail', ['$http', function($http) {
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

                scope.busy = true;
                $http.post('/signup/check/email', {email: value})
                    .success(function(data) {
                        console.log("SUCCESS: /signup/check/email returns ");
                        // everything is fine -> do nothing
                        scope.busy = false;
                    })
                    .error(function(data) {
                        // display new error message
                        console.log("ERROR: /signup/check/email 403 ");
                        console.log("ERROR: /signup/check/email isTaken is true " + data.isTaken);
                        ctrl.$setValidity('isTaken', false);
                        console.log("ERROR: /signup/check/email invalid characters");
                        ctrl.$setValidity('invalidChars', false);

                        
                        // cannot read the json data.
                        if (data.isTaken) {
                            console.log("ERROR: /signup/check/email isTaken is true " + data.isTaken);
                            ctrl.$setValidity('isTaken', false);
                        } else if (data.invalidChars) {
                            console.log("ERROR: /signup/check/email invalid characters");
                            ctrl.$setValidity('invalidChars', false);
                        }
                       

                        scope.busy = false;
                    });
            });
        }
    };
}]);

 
window.app.directive('uniqueUsername', ['$http', function($http) {  
  return {
    require: 'ngModel',
    scope: {
        email: '='
    },
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
        
        console.log('inside uniqueUsername directive ' + value + ' email: ' + email);
        scope.busy = true;
        $http.post('/validate/username', {username: value}, email)
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

*/

window.app.directive('passwordValidate', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

                scope.pwdValidLength = (viewValue && viewValue.length >= 8 ? 'valid' : undefined);
                scope.pwdHasLetter = (viewValue && /[A-z]/.test(viewValue)) ? 'valid' : undefined;
                scope.pwdHasNumber = (viewValue && /\d/.test(viewValue)) ? 'valid' : undefined;

                if(scope.pwdValidLength && scope.pwdHasLetter && scope.pwdHasNumber) {
                    ctrl.$setValidity('pwd', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('pwd', false);
                    return undefined;
                }

            });
        }
    };
});
// http://codepen.io/brunoscopelliti/pen/ECyka

window.app.directive('match', [function () {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      
      scope.$watch('[' + attrs.ngModel + ', ' + attrs.match + ']', function(value){
        ctrl.$setValidity('match', value[0] === value[1] );
      }, true);

    }
  };
}]);
