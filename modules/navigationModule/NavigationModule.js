function NavigationModule(injector) {
    
    var self = this;
    
    self.init = function() {
        WebApp.Require(['modules/navigationModule/NavigationService.js'], function() {
            
            injector.registerSingle("navigationService", "NavigationService");
        });
    };
};