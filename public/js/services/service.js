angular.module('ssnocService', [])

	// super simple service
	// each function returns a promise object 
	.factory('SsnocFactory', ['$http',function($http) {
		return {
			getDirectory : function() {
				return $http.get('/api/ssnoc/directory');
			},
			getMember : function(username) {
				return $http.get('/api/ssnoc/',username);
			},
			create : function(member) {
				return $http.post('/api/ssnoc/member', member);
				console.log('Adding member ', member);
			},
			updateStatus : function(member){
				return $http.post('/api/ssnoc/updateStatus', member)
			}
			delete : function(id) {
				return $http.delete('/api/ssnoc/' + id);
			}
		}
	}]);