angular.module('mean.system').controller('MobileFormController', ['$scope', '$http','$location', '$window','Global', 'States', 'States2',  function ($scope, $http, $location, $window, Global, States, States2  ) {

    $scope.getDefault = function() {
       
        // this works using $Resource
         $scope.stateData = States.get();   

        // this works using $http
        States2.getData().then(function(data) {
            $scope.stateData2 = data;
        });

        // this works using $http
        /*
        Countries.get().then(function(data) {
            $scope.countries = data;
        });
        

        $scope.countries = Countries.get();

        
       
        */

       
        $scope.mobile = {};

        
        // initializes mobile.state but is not displayed in choices
        /*
        $scope.mobile.state = {
              "name": "Connecticut",
              "capital": "Hartford",
              "abbreviation": "CT"
        };
        */        

       

        // this does not initializes it
        // $scope.mobile.state = JSON.stringify($scope.stateData[7]);

        /*
        $scope.mobile.state2 = {
              "name":"Arizona",
              "capital":"Phoenix",
              "abbreviation":"AZ"
        };
        */

        $scope.mobile.state = "CT";
        $scope.mobile.state2 = "NY";

        
        // this does not work
        $scope.mobile.state3 = {
              "name":"Arizona",
              "capital":"Phoenix",
              "abbreviation":"AZ"
        };
         

         
        // this works
        $scope.mobile.phoneNumber = {
              "id": 5,
              "text": "Fifth",
              "color": "pink"
        };

        // this one works but ng-init="mobile.carrier={{mobile.carrier}}" is not required
        $scope.mobile.carrier='sun';

        $scope.global = Global;  

        $scope.window = $window;
        
    };


    // this thing does not work.
    // data is fetched. takes forever
    $scope.state3JsonOptions = {
        ajax: {
            url:"/data/states2.json",
            data: function (term, page) {
                return {};
            },
            results: function (data,page) {
                var more = (page * 10) < data.total;
                return {results:data, more:more};
            }
        },
        // this thing works! it displays the default value chosen. see above
        initSelection: function(element, callback) {
            callback($(element).data('$ngModelController').$modelValue);
        }
    };  

    // this code displays the 
    $scope.dataJsonOptions = {
        ajax: {
            url: "/data/data.json",
            data: function (term, page) {
                return {};
            },
            results: function (data,page) {
                var more = (page * 10) < data.total;
                return {results:data, more:more};
            }
        },
        // this thing works! it displays the default value chosen. see above
        initSelection: function(element, callback) {
            callback($(element).data('$ngModelController').$modelValue);
        }
    };  

   

    // using factories
    $scope.dataFactoryOptions = function() {
        /*
        dataJsonFactory.getDataSync(function(results) {
            $scope.items = results.data;
        });
        */
        $scope.items = dataJsonFactory.get().then(function(results) {
            $scope.items = results.data;
        });
    };

    $scope.groupSelectOptions = {
        minimumInputLength: 3,
        ajax: {
            //url: "data.json",
            url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json",
            dataType: 'jsonp',
            data: function (term, page) {
                return {
                    q: term,
                    page_limit: 10,
                    page: page,
                    apikey: "ju6z9mjyajq2djue3gbvv26t"
                };
            },
            results: function (data,page) {
                var more = (page * 10) < data.total;
                return {results:data.movies, more:more};
            }
        }
    };
     
   
    $scope.updateMobile = function () {
  
        console.log("ng-submit updateMobile");

        console.log('State       : ' + JSON.stringify($scope.mobile.state));
        console.log('State2      : ' + JSON.stringify($scope.mobile.state2));
        console.log('State3      : ' + JSON.stringify($scope.mobile.state3));
        console.log('Phone Number: ' + JSON.stringify($scope.mobile.phoneNumber));
        console.log('Carrier     : ' + JSON.stringify($scope.mobile.carrier));

        /*
        // must pass $scope.reset and not individual values else error 500
        console.log("about to $http.post /user/profile");

        $http.post('/user/profile/' + Global.user.email, $scope.mobile)
            .success(function(data) {
                console.log("Success. back from /user/profile");

                
                $scope.window.location = '/';

                console.log("after to $scope.$apply");
              
          })
          .error(function(data){
              console.log("error in saving profile");

                  
                  $scope.window.location = '/';
                
        }); 
        */

    };  // $scope.updateProfile

}]);


