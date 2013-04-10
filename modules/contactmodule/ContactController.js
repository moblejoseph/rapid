function ContactController(container, navigationService){
    
    var self = this;
    
    self.run = function(){
        var contactListViewModel = container.resolve("contactListViewModel");
        navigationService.RegisterView("contactlist", new View("contactlist", "modules/contactmodule/contactlist/ContactListView.htm", contactListViewModel));
    };
}

