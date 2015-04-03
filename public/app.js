var app = angular.module("CMApp", []);

app.controller("CMAppController", function ($scope, $http) {
    $scope.hello = "Hello from CM App";
    console.log("hello" + $scope.hello);

    $http.get("/api/developers/")
    .success(function (response) {
        $scope.developers = response;

        $scope.add = function (developer) { // developer is being passed from add event in index
           // console.log("add "+ developer);
            $http.post("/api/developer", developer)
            .success(function (response) {
                //console.log("developer "+developer);
                console.log("response "+ response);
                $scope.developers = response;
            });

        };

        $scope.update = function (developer) {
            $http.put("/api/developers/" + $scope.selectedIndex, developer)
            .success(function (response) {
                $scope.developers = response;
            })
        };
        $scope.selectedIndex = null;
        $scope.select = function (index) {
            $scope.selectedIndex = index;
            $scope.developer = $scope.developers[index];
        };

        $scope.remove = function (index) {
            $http.delete("/api/developers/" + index)
            .success(function (response) {
               //console.log(response);
                $scope.developers = response;
            });
        };
        
    });


});