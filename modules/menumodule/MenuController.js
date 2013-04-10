function MenuController(container, regionManager){
    var self = this;
    
    self.run = function(){
        var sideMenuViewModel = container.resolve("sideMenuViewModel");
        regionManager.RegisterView("sidemenu", new View("sidemenu", "modules/menumodule/sidemenu/SideMenuView.htm", sideMenuViewModel));
        
        var topMenuViewModel = container.resolve("sideMenuViewModel");
        regionManager.RegisterView("topmenu", new View("topmenu", "modules/menumodule/topmenu/TopMenuView.htm", topMenuViewModel));
    };
}