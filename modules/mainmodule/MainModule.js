function MainModule(injector) {
    var self = this;
    self.init = function() {
        WebApp.Require(['modules/mainmodule/dashboard/DashboardViewModel.js',
                        'modules/mainmodule/MainController.js'], function() {
                       
            injector.register("dashboardViewModel", "DashboardViewModel");
            injector.register("mainController", "MainController");
            
            injector.resolve("mainController").run();
        });
    };
};