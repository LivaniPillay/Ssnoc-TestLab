angular.module('ssnocController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','SsnocFactory', function($scope, $http, SsnocFactory) {
		$scope.member = {};
		$scope.directory = {};
		$scope.loading = true;

		var username = typeusername; //User typein
		var password = typepassword; //user typein pass

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		SsnocFactory.getDirectory()
			.success(function(data) {
				$scope.directory = data;
				$scope.loading = false;
			});

		$scope.login = function(){

			$scope.loading = true;
			if(isExistingMember()){
				if($scope.validateLoginDetails){
					updateStatus();		
				}
			}
				
			else{
				if($scope.validateSignInDetails){
					updateStatus();
				}
			}
			// 	}
			// }
			// else
			// {

			// }
		}

		$scope.logout = function(){
			$scope.loading = true;
			goOffline();
		}

		getDirectory = function()
		{	
			$scope.loading = true;
			SsnocFactory.getDirectory()
				.success(function(data) {
			  // Sample data:
			  // data = {
			  //   "angela": 1,
			  //   "fbwolf": 0,
			  // }
				$scope.directory = data;
        //form two lists
				var onlinelist=[];
				var offlinelist=[];
				for (var name in data){
					var status=data[name];
					if ( status != 0){
						// add name into list
						onlinelist.push(name);
					}
					else {
						offlinelist.push(name);
					}	 	
				}

				 // sort list and merge list
				 onlinelist.sort();
				 offlinelist.sort();
         var list = onlinelist.concat(offlinelist);

				 // acccoding to list, display it
				 angular.element($('#directory')).empty();
            for( var i=0; i<list.length; i++){
              $('#directory').append(
                $('<li>').html(list[i].name)
                );
           }

				$scope.loading = false;
			});	

		}
		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		createMember = function() {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				SsnocFactory.create($scope.member)
					.success(function(data) {
						$scope.loading = false;
						$scope.member = member; 
					});
		};


		isExistingMember = function(){
			SsnocFactory.getMember($username)
				.success(function(data){
					//check existing member from user typein username with DB 
					if(data != undefined)
					{
						$scope.member = data;
						return true;
					}else
					{
						$message = "no existing member";
						return false;
					}
				});
		}

		$scope.validateLoginDetails = function(){
			if (  $password == $scope.member.password){
			  	return true;
			  } 
			else {
				 $message = "wrong infomation";
				 return false;		 
			}


		}

		$scope.validateSignInDetails = function(){
			//usecase requirements: https://drive.google.com/file/d/0B7mdj-x_n_iSX3Y4Q2FoallpMEE/view
			var reservedlists = ["backup", "banner", "banners", "bin", "billing", "blog", "blogs", "board", "bot"];
			if ( $username.length < 3 || reservedlists.indexOf($username) != -1 ){
				$message = "Please provide a different username.";
				return false;
			}
			if ( $password_1.length < 4){
				$message = "Please provide a different password, the password should include atleat 4 characters.";
				return false;
			}
			if ( $password_1 != $password_2 ){
				$message = "the two passwords dosen't match.";
				return false;
			}
			else {
				return true;
			}		
		}


		// goOnline = function(){
		// 	//@angela validate here
		// 	if( $scope.member.status != 0){
		// 		updateStatus();
		// 	}		
		// }

		// goOffline = function(){
		// 	//@angela please add validation
		// 	if ( $scope.member.status == 0){
		// 		updateStatus();
		// 	}			
		// }

//update status send no
		updateStatus = function(member){
			SsnocFactory.updateStatus(member).success(
				function(data){
			 		// $scope.member = data;
			 		console.log(data);
			 		$scope.loading = false;
			 	}
			);
		}

	}]);