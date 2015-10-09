app.factory('ssnocService',function($http) {
			 var socket = io.connect();
       var service = {
        
			getDirectory : function() {
				return $http.get('/api/ssnoc/directory');
			},
			getMember : function(username) {
				return $http.get('/api/ssnoc/member/'+ username);

			},
			create : function(member) {
				return $http.post('/api/ssnoc/member/'+ member.username +"/"+member.password);

			},
			updateStatus : function(member){
				return $http.post('/api/ssnoc/update_status/'+member._id +"/"+member.status);
			},

			addPublicMessage : function(message,user_id){
		  $http.post('/api/ssnoc/message/' + user_id + '/' + message).success(function(data){
		 		// socket.emit("message", data);
		 	 });
			},
			getPublicMessages : function(){
				return $http.get('/api/ssnoc/messages');

			}

			// delete : function(id) {
			// 	return $http.delete('/api/ssnoc/' + id);
			// }
		}

		return service;
});