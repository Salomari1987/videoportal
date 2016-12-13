describe('services', function () {
  var $window

  // Load the api.pokemon module which we'll create next
  beforeEach(angular.mock.module('co'));

  describe('Videos factory', function() {
    var Videos, $httpBackend;

    // Inject the Pokemon service
    beforeEach(inject(function(_Videos_, _$httpBackend_) {
      Videos = _Videos_;
      $httpBackend = _$httpBackend_;
    }));

    // Verify our controller exists
    it('should exist', function() {
      expect(Videos).toBeDefined();
    });
    describe('getOne', function() {
      var result, API, RESPONSE_SUCCESS;


      beforeEach(function() {
  		// Initialize our local result object to an empty object before each test
  		result = {};

  		// Initialize url to be called by service
  		API = "/video?videoId=";

  		// Initialize response
  		RESPONSE_SUCCESS = {
  			status: "success",
  			data: {
  				_id: "584aacb79958e8299d075f6c",
  				url: "videos/What_is_the_MEAN_Stack.mp4"
  			}
  		};

  		// Spy on our service call but allow it to continue to its implementation
  		spyOn(Videos, "getOne").and.callThrough();
    });

      it('should return a single video', function() {
        var videoId = "584aacb79958e8299d075f6c";

        // Declare the endpoint we expect our service to hit and provide it with our mocked return values
        $httpBackend.when('GET', API + videoId).respond(RESPONSE_SUCCESS);
        $httpBackend.when('GET', 'app/auth/login.html').respond(RESPONSE_SUCCESS);
        
        expect(Videos.getOne).not.toHaveBeenCalled();
        expect(result).toEqual({});

        Videos.getOne(videoId)
        .then(function(res) {
          result = res;
        });

        // Flush pending HTTP requests
        $httpBackend.flush();

        expect(Videos.getOne).toHaveBeenCalledWith(videoId);
        expect(result._id).toEqual(videoId);
        expect(result.url).toEqual("videos/What_is_the_MEAN_Stack.mp4");
      });
    })

    describe('getMany', function() {
      var result, API, RESPONSE_SUCCESS;

      beforeEach(function() {

      // Initialize our local result object to an empty object before each test
  		result = {};

  		// Initialize url to be called by service
  		API = "/videos";

  		// Initialize response
  		RESPONSE_SUCCESS = {
  			status: "success",
  			data: [{
  				_id: "584aacb79958e8299d075f6c",
  				url: "videos/What_is_the_MEAN_Stack.mp4"
  			},
  			{
  				_id: "584aacb79958e8299d075f6c",
  				url: "videos/What_is_the_MEAN_Stack.mp4"
  			},
  			{
  				_id: "584aacb79958e8299d075f6c",
  				url: "videos/What_is_the_MEAN_Stack.mp4"
  			},
  			{
  				_id: "584aacb79958e8299d075f6c",
  				url: "videos/What_is_the_MEAN_Stack.mp4"
  			}]
  		}
  		// Spy on our service call but allow it to continue to its implementation
  		spyOn(Videos, "getMany").and.callThrough();
    });

      it('should return videos', function() {

        var url = API + "?skip=0&limit=4";
        // Declare the endpoint we expect our service to hit and provide it with our mocked return values
        $httpBackend.when('GET', url).respond(RESPONSE_SUCCESS);
        $httpBackend.when('GET', 'app/auth/login.html').respond(RESPONSE_SUCCESS);

        expect(Videos.getMany).not.toHaveBeenCalled();
        expect(result).toEqual({});

        Videos.getMany(0, 4)
        .then(function(res) {
          result = res;
        });

        // Flush pending HTTP requests
        $httpBackend.flush();

        expect(Videos.getMany).toHaveBeenCalledWith(0, 4);
        expect(result[0]._id).toEqual("584aacb79958e8299d075f6c");
        expect(result[0].url).toEqual("videos/What_is_the_MEAN_Stack.mp4");
      });
    })
  });
  describe('Auth factory', function() {
    var Auth, $httpBackend, $location;

    // Inject the Pokemon service
    beforeEach(inject(function(_Auth_, _$httpBackend_, _$location_, _$window_) {
      Auth = _Auth_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      $window = _$window_;
    }));

    // Verify our controller exists
    it('should exist', function() {
      expect(Auth).toBeDefined();
    });
    describe('test login', function() {
      var result, API, RESPONSE_SUCCESS;


      beforeEach(function() {
     // Initialize our local result object to an empty object before each test
     result = {};

     // Initialize url to be called by service
     API = "/user/auth";

     // Initialize response
     RESPONSE_SUCCESS = {
       status: "success",
       sessionId: 2,
       username: "ali"
     };

     // Spy on our service call but allow it to continue to its implementation
        spyOn(Auth, "login").and.callThrough();
    });

      it('should authorize user', function() {
        var user = {
       username: "ali",
       password: "password"
     };

        // Declare the endpoint we expect our service to hit and provide it with our mocked return values
        $httpBackend.when('POST', API, user).respond(RESPONSE_SUCCESS);
        $httpBackend.when('GET', 'app/auth/login.html').respond(RESPONSE_SUCCESS);

        expect(Auth.login).not.toHaveBeenCalled();
        expect(result).toEqual({});

        Auth.login(user)
        .then(function(res) {
          result = res;
        });

        // Flush pending HTTP requests
        $httpBackend.flush();

        expect(Auth.login).toHaveBeenCalledWith(user);
        expect(result.status).toEqual("success");
        expect(result.sessionId).toEqual(2);
        expect(result.username).toEqual("ali");
      });
    })

    describe('test logout', function() {
      var result, API, RESPONSE_SUCCESS, RESPONSE_FAILURE;

      beforeEach(function() {
       // Initialize our local result object to an empty object before each test
       result = {};

       // Initialize url to be called by service
       API = "/user/logout";

       // Initialize response success
         RESPONSE_SUCCESS = {
           status: "success"
         };
      
        // Initialize response failure
        RESPONSE_FAILURE = {
          status: "failure"
        };

       // Spy on our service call but allow it to continue to its implementation
       spyOn(Auth, "logout").and.callThrough();
      });

      it('should authorize user', function() {

        // Declare the endpoint we expect our service to hit and provide it with our mocked return values
        $httpBackend.when('GET', API).respond(RESPONSE_SUCCESS);
        // $httpBackend.when('GET', API).respond(RESPONSE_SUCCESS);
        $httpBackend.when('GET', "app/videos/videos.html").respond();
        $httpBackend.when('GET', "app/auth/login.html").respond();
      
        expect(Auth.logout).not.toHaveBeenCalled();
        expect(result).toEqual({});

        Auth.logout()
        .then(function(res) {
          result = res;
        });

        // Flush pending HTTP requests
        $httpBackend.flush();

        expect(Auth.logout).toHaveBeenCalled();
      });
      it('should return failure if logout fails', function() {

        // Declare the endpoint we expect our service to hit and provide it with our mocked return values
        $httpBackend.when('GET', API).respond(RESPONSE_FAILURE);
        $httpBackend.when('GET', 'app/auth/login.html').respond(RESPONSE_FAILURE);
        
        expect(Auth.logout).not.toHaveBeenCalled();
        expect(result).toEqual({});

        console.log(RESPONSE_FAILURE)
        Auth.logout()
        .then(function(res) {
          result = res;
        });

        // Flush pending HTTP requests
        $httpBackend.flush();

        expect(Auth.logout).toHaveBeenCalled();
        expect(result.status).toEqual("failure");
      });
    });
  });
})