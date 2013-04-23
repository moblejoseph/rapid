function ContactModule(container, fileManager) {
    
    var self = this;
    
    self.init = function() {
        fileManager.require(['modules/contactmodule/contactadd/ContactAddViewModel.js',
                             'modules/contactmodule/contactdetails/ContactDetailsViewModel.js',
                             'modules/contactmodule/contactlist/ContactListViewModel.js',
                             'modules/contactmodule/ContactController.js'], function() {
            
            container.register("contactListViewModel", "ContactListViewModel");
            container.register("contactAddViewModel", "ContactAddViewModel");
            container.register("contactDetailsViewModel", "ContactDetailsViewModel");
            container.register("contactController", "ContactController");
            
            container.resolve("contactController").run();
        });
    };
};