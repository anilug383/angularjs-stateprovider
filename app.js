var app = angular.module('myApp1',['ui.router']);
app.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'product.html',
        controller: 'productController'
    });
}])
app.controller('productController', function($scope, productService){
    productService.getProducts(function(response){
        $scope.products = response;
    })
})
app.service('productService', function($http){
    this.getProducts = function(callback){
        $http.get("http://localhost:8090/getProducts").then(function(response){
            callback(response.data);
        })
    }

})