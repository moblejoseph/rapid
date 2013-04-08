function ContactController(injector,navigationService){
    var self = this;
    
    self.run = function(){
        var contactListViewModel = injector.resolve("contactListViewModel");
        navigationService.RegisterView("contactlist", new View("contactlist", "modules/contactmodule/contactlist/ContactListView.htm", contactListViewModel));
    };
}

