function MainController(injector,navigationService){
    var self = this;
    
    self.run = function(){
        var dashboardViewModel = injector.resolve("dashboardViewModel");
        navigationService.RegisterView("dashboard", new View("dashboard", "modules/mainmodule/dashboard/DashboardView.htm", dashboardViewModel));
    };
}