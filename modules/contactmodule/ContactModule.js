function ContactModule(container, fileManager) {
    
    var self = this;
    
    self.init = function() {
        fileManager.require(['modules/contactmodule/contactlist/ContactListViewModel.js',
                             'modules/contactmodule/ContactController.js'], function() {
            
            container.register("contactListViewModel", "ContactListViewModel");
            container.register("contactController", "ContactController");
            
            container.resolve("contactController").run();
        });
    };
};