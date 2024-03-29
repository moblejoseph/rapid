function MainModule(container, fileManager) {
    
    var self = this;
    
    self.init = function() {
        fileManager.require(['modules/mainmodule/dashboard/DashboardViewModel.js',
                             'modules/mainmodule/MainController.js'], function() {
                       
            container.register("dashboardViewModel", "DashboardViewModel");
            container.register("mainController", "MainController");
            
            container.resolve("mainController").run();
        });
    };
};