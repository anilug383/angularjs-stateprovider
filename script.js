var app = angular.module('myApp', ['ui.router','myApp1']);
app.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('message1', {
        url: '/message1',
        templateUrl: 'message1.html',
        controller: 'message1Controller'
    });
    $stateProvider.state('message2', {
        url: '/message2',
        templateUrl: 'message2.html',
        controller: 'message2Controller'
    });
    $stateProvider.state('message3', {
        url: '/message3',
        templateUrl: 'message3.html',
        controller: 'message3Controller'
    });
    $stateProvider.state('users', {
        url: '/users',
        templateUrl: 'users.html',
        controller: 'userController'
    });
    $stateProvider.state('findUser', {
        url: '/user/:name',
        param: {
            name: null
        },
        templateUrl: 'usersFind.html',
        controller: 'userFindController'
    });
}]);

app.controller('userFindController', function($scope, $stateParams,userService1){
    var name = $stateParams.name;
    userService1.findByName(name, function(response){
        $scope.users = response;
    })

});

app.controller('userController', function($scope, userService1, $location, $state){
    userService1.getUsers(function(response){
        $scope.users = response;
    })
    $scope.findUser = function(input){
        if(input){
            $state.go('findUser', {name: input});
        } else {
            $state.go('findUser');
        }
    }
});

app.controller('message3Controller', function($scope, message3Service){
    $scope.getSquare = function(){
        message3Service.getSquare($scope.number, function(response){
            $scope.squareNumber = response;
        })
    }

})

app.controller('message1Controller', function($scope, userService){
        $scope.userList = {};
        var users1 = [
                {name: 'name1', city: 'city1'},
                {name: 'name2', city: 'city2'},
                {name: 'name3', city: 'city3'},
                {name: 'name4', city: 'city4'},
        ];
        userService.getUsers(function(res){
            $scope.userList = res;
            console.log(userList)
    });

    $scope.deleteUser = function(user){
         var index = $scope.userList.indexOf(user);
        $scope.userList.splice(index, 1);  
    };

    $scope.editUser = function(user) {
        var index = $scope.userList.indexOf(user);r
    }
});

app.controller('message2Controller', function($scope, $location, $window){

    $scope.login = function(){
        if($scope.user.name == 'anil' && $scope.user.password=='password'){
            alert('login successfull')
            $window.location.href="success.html";
        } else {
            $window.location.href="failure.html";
        }
    }
    $scope.clear = function(){
        $scope.user.name ='';
        $scope.user.password='';
    }
    
})

app.service('userService', function($http){
    this.getUsers = function(callback){
        $http.get('https://jsonplaceholder.typicode.com/users').then(function(response){
            callback(response.data)
       }, function(error){
           console.log(error)
       });
    };
})

app.service('message3Service', function($http){
    this.getSquare = function(a, callback){
        $http.get("http://localhost:8090/getSqaure", {params:{number: a}}).then(function(response){
            callback(response.data)
        }, function(error){
            console.log(error.statusCode)
        });
    };
})

app.service('userService1', function($http){
    this.getUsers = function(callback){
        $http.get("http://localhost:8090/getUsers").then(function(response){
            callback(response.data);
        })
    }
    this.findByName = function(name1, callback){
        var config = {
            params:{
                name : name1
            }
        }
        $http.get("http://localhost:8090/findByName", config).then(function(response){
            callback(response.data)
        })
    }
})

