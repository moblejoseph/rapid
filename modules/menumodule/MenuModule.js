function MenuModule(injector) {
    var self = this;
    self.init = function() {
        WebApp.Require(['modules/menumodule/sidemenu/SideMenuViewModel.js',
            'modules/menumodule/topmenu/TopMenuViewModel.js',
            'modules/menumodule/MenuController.js'], function() {
           
            injector.register("sideMenuViewModel", "SideMenuViewModel");
            injector.register("topMenuViewModel", "TopMenuViewModel");
            injector.register("menuController", "MenuController");
            
            injector.resolve("menuController").run();
        });
    };
};