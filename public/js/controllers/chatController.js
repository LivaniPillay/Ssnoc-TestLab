app.controller("chatController",function($scope, ssnocService, $q,$rootScope){
    $scope.directory = {};
    $scope.sortType ="status";
    $scope.loading = true;
    $scope.chatMessage = "";
    var defer = $q.defer();

    getDirectory();

    function getDirectory()
    { 
      $scope.loading = true;
      ssnocService.getDirectory()
        .success(function(data) {

        $scope.directory = data;
        $scope.loading = false;

      }); 
    }

    $scope.sendMessage = function(){
      
      console.log("sendMessage");
      console.log($rootScope.id);
      ssnocService.addPublicMessage($rootScope.id, $scope.chatMessage).
      success(function(response){
        
      });


    }

});