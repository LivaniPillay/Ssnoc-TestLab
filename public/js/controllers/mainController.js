
app.controller("mainController",function($scope, ssnocService){
		$scope.member = {};
		$scope.directory = {};
		$scope.sortType ="status";
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos


		$scope.login = function(){

			// console.log($scope.member.username);
			$scope.loading = true;

			$scope.isExistingMember();
		}


		$scope.isExistingMember = function(){
			ssnocService.getMember($scope.member.username)
				.then(
					function(response){
						data = response.data;
						if(data !=undefined)
						{
							if (validateLoginDetails(data)) {
								  console.log("haodongxi");
									// login successfull and send chat.html
									// updateStatus();
									window.location = "/#/chatting";

							}
							else {
								console.log("huaidongxi");
								console.log(data);
								$scope.message = "wrong infomation,please type in again";
							}
						}
									
						else
							// not a member, crete new
						{ 
							$scope.message = "no existing member";
							//change hidden password box

							// create new 
							// createMember();
							console.log("should creat new");
						}
					},
					function(err){
								console.log("failedcall");
						}
					);
			    // console.log(dbMember);			
				}


		$scope.signIn = function()
		{
			if(validateSignInDetails()){
				updateStatus();
			}
		}

		$scope.logout = function(){
			$scope.loading = true;
			goOffline();
		}

		function getDirectory()
		{	
			$scope.loading = true;
			ssnocService.getDirectory()
				.success(function(data) {
			  // Sample data:
			  // data = {
			  //   "angela": 1,
			  //   "fbwolf": 0,
			  // }
				$scope.directory = data;
				$scope.loading = false;

				//@angela angular will handle the sort for you. 
       	
      //  	        angular.forEach($scope.directory, function (name) {
	     //           	var status=data[name];
						// if ( status != 0){
						// 	// add name into list
						// 	onlinelist.push(name);
						// }
						// else {
						// 	offlinelist.push(name);
						// }	 
	     //        });

				 // sort list and merge list
				 // onlinelist.sort();
				 // offlinelist.sort();
     //    	 	 var list = onlinelist.concat(offlinelist);

				 // // acccoding to list, display it
				 // angular.element($('#directory')).empty();

				 // angular.forEach(list, function(name){
				 // 	$('#directory').append(
	    //             $('<li>').html(name);
	    //             );
				 // });

				
			});	

		}
		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		function createMember() {
				$scope.loading = true;
				// call the create function from our service (returns a promise object)
				ssnocService.create($scope.member)
					.success(function(data) {
						$scope.loading = false;
						$scope.member = member; 
					});
		}

		// function getMember(){
		// 	$scope.loading = true;
		// 	ssnocService.getMember($scope.member.username)
		// 	.success(function(data){
		// 		console.log(data);

		// 		$scope.loading = false;
		// 		return data;
		// 	}).error(function(error)
		// 	{
		// 		console.log(error);
		// 	});
		// }
		

		

		
		function validateLoginDetails(data){
			// var dbMember = getMember();
			if(data != undefined)
			{
				if(data.password == $scope.member.password){
				return true;
				}
			}
			else {
				 $message = "wrong infomation";
				 return false;		 
			}
		}

		function validateSignInDetails(){
			//usecase requirements: https://drive.google.com/file/d/0B7mdj-x_n_iSX3Y4Q2FoallpMEE/view
			var reservedlists = ["backup", "banner", "banners", "bin", "billing", "blog", "blogs", "board", "bot"];
			if ($scope.member.username.length < 3 || reservedlists.indexOf($scope.member.username) != -1 ){
				$scope.message = "Please provide a different username.";
				return false;
			}
			if ($scope.member.password.length < 4){
				$scope.message = "Please provide a different password, the password should include atleat 4 characters.";
				return false;
			}
			if ($scope.member.password != $scope.member.confirmPassword){
				$scope.message = "the two passwords dosen't match.";
				return false;
			}
			else {
				return true;
			}		
		}


		//update status send no
		function updateStatus(member){
			ssnocService.updateStatus(member).success(
				function(data){
			 		$scope.member = data;
			 		// console.log(data);
			 		$scope.loading = false;
			 	}
			);
		}
});