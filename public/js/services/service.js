app.factory('ssnocService',function($http) {

        var service = {
        
			getDirectory : function() {
				return $http.get('/api/ssnoc/directory');
			},
			getMember : function(username) {
				return $http.get('/api/ssnoc/member/'+ username);
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