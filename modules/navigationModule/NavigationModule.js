function NavigationModule(container) {
    
    var self = this;
    
    self.init = function() {
        WebApp.Require(['modules/navigationModule/NavigationService.js'], function() {
            
            container.registerSingle("navigationService", "NavigationService");
        });
    };
};