angular.module('ssnocController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','SsnocFactory', function($scope, $http, SsnocFactory) {
		$scope.member = {};
		$scope.directory = {};
		$scope.loading = true;

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
			if($scope.isExistingMember)
			{
				if($scope.validateLoginDetails)
				{
					goOnline();
					
				}
				else{

				}
			}
			else
			{

			}
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
				$scope.directory = data;
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
			}
		};


		isExistingMember = function(){
			SsnocFactory.getMember($scope.member.username)
				.success(function(data){
					//@angela please use data to validate login details with $scope.member
					if(data != undefined)
					{
						$scope.member = data;
						return true;
					}else
					{
						return false;
					}
				});
		}

		$scope.validateLoginDetails = function(){

		}

		$scope.validateSignInDetails = function(){

		}

		goOnline = function(){
			//@angela validate here
			$scope.member.status =1;
			updateStatus();
		}

		goOffline = function(){
			//@angela please add validation
			$scope.member.status = 0;
			updateStatus();
		}

		updateStatus = function(){
			SsnocFactory.updateStatus($scope.member)
			 	.success(function(data){
			 		$scope.member = data;
			 		$scope.loading = false;
			 	});
		}

	}]);