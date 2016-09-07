describe("Main test suite", function() {
  var $rootScope, $controller, controller, successRequestHandler;
  
  beforeEach(module('app'));

  beforeEach(inject(function($injector) {    
      $httpBackend = $injector.get('$httpBackend');
      
      // Get hold of a scope (i.e. the root scope)
      $rootScope = $injector.get('$rootScope');
      
      // The $controller service is used to create instances of controllers
      var $controller = $injector.get('$controller');

      createController = function() {
        return $controller('feedLoader', {'$scope' : $rootScope });
      };
  }));
  
  it("Check feedLoader controller has been defined.", function() {
      controller = createController(); 
      expect(controller).to.not.be.undefined;
  });

  describe("Testing suite for submitFeed function",function(){   

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("Check initial value of feedURL", function() {
      controller = createController();
      expect($rootScope.feedURL).to.equal('http://pf.tradetracker.net/?aid=1&type=xml&encoding=utf-8&fid=251713&categoryType=2&additionalType=2&limit=10');
    });

    it("Check on page load, products array is exists and its empty", function() {
      expect($rootScope.products).to.be.empty;
    });

    it("Check on page load, message variable is exists and its empty", function() {
      expect($rootScope.message).to.be.empty;
    });

    it("should post the request to server when we have a value in our feeds url input.", function(){     
      successRequestHandler = $httpBackend.when('POST', './api/ttAPI.php')
                            .respond({status: true, "products":[{"productID":"eset_56062001usr-50-99","name":"ESET ESET NOD32 Secure Enterprise 2 jr 50 - 99 Workstations\/Gebruikers (LET (56062001USR-50-99)","currency":"EUR","price":"59.53","productURL":"http:\/\/www.centralpoint.nl\/tracker\/index.php?tt=534_251713_1_&r=https%3A%2F%2Fwww.centralpoint.nl%2Falgemene-utility-software%2Feset%2Feset-secure-enterprise-2-year-subscription-level-h-50-99-devices-prijs-per-device-engels-art-56062001usr-50-99-num-1743187%2F","imageURL":"http:\/\/www02.cp-static.com\/images\/pna_fo.jpg","description":"ESET NOD32 Secure Enterprise 2 jr 50 - 99 Workstations\/Gebruikers (LET OP: Prijs is per User!)","categories":"algemene utilities"}] });  

      $httpBackend.expectPOST('./api/ttAPI.php'); //mock the http post
      controller = createController(); // make the controller
      $rootScope.submitFeed(); //run the function
      $httpBackend.flush(); 
      expect($rootScope.products).to.eql([{"productID":"eset_56062001usr-50-99","name":"ESET ESET NOD32 Secure Enterprise 2 jr 50 - 99 Workstations\/Gebruikers (LET (56062001USR-50-99)","currency":"EUR","price":"59.53","productURL":"http:\/\/www.centralpoint.nl\/tracker\/index.php?tt=534_251713_1_&r=https%3A%2F%2Fwww.centralpoint.nl%2Falgemene-utility-software%2Feset%2Feset-secure-enterprise-2-year-subscription-level-h-50-99-devices-prijs-per-device-engels-art-56062001usr-50-99-num-1743187%2F","imageURL":"http:\/\/www02.cp-static.com\/images\/pna_fo.jpg","description":"ESET NOD32 Secure Enterprise 2 jr 50 - 99 Workstations\/Gebruikers (LET OP: Prijs is per User!)","categories":"algemene utilities" }]);
    });

    it("Must show an error message when server response status is false", function(){     
      successRequestHandler = $httpBackend.when('POST', './api/ttAPI.php')
                            .respond({status: false, "error":"Ooops, unfortunately, we couldn't retrieve any product from this XML file."});  

      $httpBackend.expectPOST('./api/ttAPI.php'); //mock the http post
      controller = createController(); // make the controller
      $rootScope.submitFeed(); //run the function
      $httpBackend.flush(); 
      expect($rootScope.message).to.equal("Ooops, unfortunately, we couldn't retrieve any product from this XML file.");
    });

    it("Must show an error message when submitfeed() function runs with an empty feed's URL", function(){
      controller = createController(); // make the controller
      $rootScope.feedURL = ""; //clear the feedurl initial value
      $rootScope.submitFeed(); //run the function
      expect($rootScope.message).to.equal("Please insert an xml file's url.");
    });     

  });

});