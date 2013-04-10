function MenuModule(container, fileManager) {
    
    var self = this;
    
    self.init = function() {
        fileManager.require(['modules/menumodule/sidemenu/SideMenuViewModel.js',
                             'modules/menumodule/topmenu/TopMenuViewModel.js',
                             'modules/menumodule/MenuController.js'], function() {

        container.register("sideMenuViewModel", "SideMenuViewModel");
        container.register("topMenuViewModel", "TopMenuViewModel");
        container.register("menuController", "MenuController");

        container.resolve("menuController").run();
        });
    };
};