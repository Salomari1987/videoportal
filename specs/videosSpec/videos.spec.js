describe('VideosController', function() {
  var VideosController, $controller, scope, Videos;

  // Load ui.router and our components.users module which we'll create next
  beforeEach(angular.mock.module('co'));

  // Inject the $controller service to create instances of the controller (UsersController) we want to test
  beforeEach(inject(function($controller, $rootScope, _Videos_) {
    scope = $rootScope.$new(); //get a childscope
    Videos = _Videos_;

    spyOn(Videos, 'rateVideo').and.callFake(function () {
    	return 5;
    })
    VideosController = $controller(
    							'VideosController', 
    							{
    								$scope:scope,
    								Videos: Videos
    							});

  }));

  // Verify our controller exists
  it('should change rating value when hovering over', function() {
    scope.hoveringOver(4)
    expect(scope.max).toEqual(5);
    expect(scope.hoveringOver).toBeDefined();
    expect(scope.overStar).toEqual(4);
    expect(scope.percent).toEqual(80)
  });
  it('should change rating value when hovering over', function() {
  	scope.rateVideo(1, 1)
  	expect(Videos.rateVideo).toHaveBeenCalled()
  });
})