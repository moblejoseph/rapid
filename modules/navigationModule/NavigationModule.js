function NavigationModule(container, fileManager) {

    var self = this;

    self.init = function() {
        fileManager.require(['modules/navigationModule/NavigationService.js'], function() {

            container.registerSingle("navigationService", "NavigationService");
        });
    };
};