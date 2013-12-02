/*
angular.module('mean.system').factory("Countries", ['$http', function($http) { 
    return $http('http://api.geonames.org/countryInfoJSON?lang=en&username=randygit&callback=?', {}, {
        get: {method: 'GET', isArray:true}
    });
}]);
*/

    /*
    $http({method:'GET', url: 'http://api.geonames.org/countryInfoJSON?lang=en&username=randygit&callback=?'}).
        success(function(data, status, headers, config) {
            return data;
        }).
        error(function(data, status, headers, config) {
        
        });
    */
/*
angular.module('mean.system').factory("Countries", ['$http', function($http) { 
    return {
        getData: function() {
            return $http.get('http://api.geonames.org/countryInfoJSON?lang=en&username=randygit&callback=?').then(function(result) {
                return result.data;
            });
        }
    };
}]);
*/
