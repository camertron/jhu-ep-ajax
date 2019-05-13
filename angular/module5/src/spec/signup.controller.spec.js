(function() {
  describe('SignUpController', function() {
    var signUpController;
    var MenuService;
    var UserService;
    var ApiPath;

    var $httpBackend;
    var $controller;

    beforeEach(function() {
      module('restaurant');

      inject(function (_$controller_, $injector) {
        $controller = _$controller_;
        $httpBackend = $injector.get('$httpBackend');
        ApiPath = $injector.get('ApiPath');
        MenuService = $injector.get('MenuService');
        UserService = $injector.get('UserService');
      });

      signUpController = $controller(
        'SignUpController', {UserService: UserService, MenuService: MenuService}
      );
    });

    it('should return true if the menu category exists', function() {
      var menuItems = {menu_items:[{}]};
      $httpBackend.whenGET(ApiPath + '/menu_items.json?category=L').respond(menuItems);
      $httpBackend.whenGET().respond(200, '');
      signUpController.doesMenuCategoryExist('L').then(function(exists) {
        expect(exists).toEqual(true);
      });
      $httpBackend.flush();
    });

    it("should return false if the menu category doesn't exist", function() {
      var menuItems = {menu_items:[]};
      $httpBackend.whenGET(ApiPath + '/menu_items.json?category=L').respond(menuItems);
      $httpBackend.whenGET().respond(200, '');
      signUpController.doesMenuCategoryExist('L').then(function(exists) {
        expect(exists).toEqual(false);
      });
      $httpBackend.flush();
    });
  });
})();
