app.factory('ssnocService',function($http, $q) {

        var service = {
        
			getDirectory : function() {
				return $http.get('/api/ssnoc/directory');
			},
			getMember : function(username) {
				var defer = $q.defer();
				$http.get('/api/ssnoc/member/'+ username).
				success(function(res){
					defer.resolve(res);
				}).error(function(err){
					defer.reject(err);
				});

				return defer.promise;
			},
			create : function(member) {
				return $http.post('/api/ssnoc/member', member);
				console.log('Adding member ', member);
			},
			updateStatus : function(member){
				return $http.post('/api/ssnoc/updateStatus', id,status)
			}
			// delete : function(id) {
			// 	return $http.delete('/api/ssnoc/' + id);
			// }
		}

		return service;
});