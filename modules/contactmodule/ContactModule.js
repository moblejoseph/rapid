function ContactModule(injector) {
    
    var self = this;
    
    self.init = function() {
        WebApp.Require(['modules/contactmodule/contactlist/ContactListViewModel.js',
                        'modules/contactmodule/ContactController.js'], function() {
            
            injector.register("contactListViewModel", "ContactListViewModel");
            injector.register("contactController", "ContactController");
            
            injector.resolve("contactController").run();
        });
    };
};