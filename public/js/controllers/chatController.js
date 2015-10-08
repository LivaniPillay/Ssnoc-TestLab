app.controller("chatController",function($scope, ssnocService, $q,$rootScope){
    $scope.directory = {};
    $scope.sortType ="status";
    $scope.loading = true;
    $scope.messages = {};
    $scope.chatMessage = "";
    var defer = $q.defer();

    //testing faye
    var messageClient = new Faye.Client('http://localhost:8000/');

    client.subscribe('/messages', function(message) {
      console.log('Got a message: ' + message.text);
    });

    getDirectory();
    getAllMessages();

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
      ssnocService.addPublicMessage($scope.chatMessage, $rootScope.id).
      success(function(response){
          client.publish('/messages', {
            text: response.message
          });
          console.log("Response" + response);
          $scope.messages.push(response);
      });

    }

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