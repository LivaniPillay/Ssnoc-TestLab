app.controller("chatController",function($scope, ssnocService, $q,$rootScope){
    $scope.directory = {};
    $scope.loading = true;
    $scope.messages = [];
    $scope.chatMessage = "";
    var defer = $q.defer();
    var socket = io.connect();  

    //testing faye
    // var Client = new Faye.Client('http://localhost:8000/');

    // client.subscribe('/messages', function(message) {
    //   console.log('Got a message: ' + message.text);
    // });

    getDirectory();
    getAllMessages();

    $scope.logout = function()
    {
      console.log("logout");
      console.log($rootScope.id);
      ssnocService.updateStatus($rootScope.id, 0).
      success(function(response){
          console.log("logout" + response);
      });
    }
   
    $scope.isOnline = function(status)
    {
        if(status != 0)
        {
          return true;
        }
        else
        {
          return false;
        }
    }

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
      ssnocService.addPublicMessage($scope.chatMessage, $rootScope.id);
    }


    socket.on('message', function(msg){
        $scope.messages.push(msg);
        $scope.chatMessage = "";
        $scope.$apply();

      });
  
     function getAllMessages(){
        console.log("getting messages");
        ssnocService.getPublicMessages()
        .success(function(response)
        {
          console.log(response);
          $scope.messages = response;
        });
    }

});