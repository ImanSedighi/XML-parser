 var app = angular.module("app", []);

 app.controller('feedLoader', ['$scope','$http','$sce', function($scope,$http,$sce) {
	$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
	$scope.message; //it keeps the error messages we get from our api or we generate in client side. We can show the error messages by calling showerror() function.
	$scope.products = []; //it keeps all of the products data which we fetch from server
	$scope.feedURL = "";

	$scope.submitFeed = function(){ //this function submits user's inserted feeds url to server and fetch the data if there is any
		if($scope.feedURL != ""){
			$('.loader').show();
			$http.post("./api/ttAPI.php" , //this is the url of our api which processes the product urls
				$.param({'feedsUrl': $scope.feedURL})
			).success(function (data) {   //This function handles successful post request			
				
				$('.loader').hide();
				if(data.status){ //if there are some products in the server response then show it in the view
					$scope.products = data.products;

				} else{ // if there is no product has been fetched by the server then show the error message which is sent by server.
					$scope.message = data.error; 
					$scope.showerror(5000);
				}
			
			});
		} else{ //show an error if there is no url in the input text.
			$scope.message = "Please insert an xml file's url."; 
			$scope.showerror(3000); //As the error message is shorter then user doesn't need so much time to read the error so we fade the error faster. 
		}			
	}
	

	$scope.showerror = function(delay){ //this function shows an error messages to user and hide it after the given delay time.
		$(".error").css("opacity","1"); //show the error received from server to the user
		setTimeout(function(){ $(".error").css("opacity","0"); }, delay); //Fade out the error after a given number of seconds to not to bother user with always showing an error
	}

}]);