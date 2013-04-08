function MenuController(injector,regionManager){
    var self = this;
    
    self.run = function(){
        var sideMenuViewModel = injector.resolve("sideMenuViewModel");
        regionManager.RegisterView("sidemenu", new View("sidemenu", "modules/menumodule/sidemenu/SideMenuView.htm", sideMenuViewModel));
        
        var topMenuViewModel = injector.resolve("sideMenuViewModel");
        regionManager.RegisterView("topmenu", new View("topmenu", "modules/menumodule/topmenu/TopMenuView.htm", topMenuViewModel));
    };
}