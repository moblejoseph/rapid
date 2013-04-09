function MainController(container,navigationService){
    var self = this;
    
    self.run = function(){
        var dashboardViewModel = container.resolve("dashboardViewModel");
        navigationService.RegisterView("dashboard", new View("dashboard", "modules/mainmodule/dashboard/DashboardView.htm", dashboardViewModel));
    };
}