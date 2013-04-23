function ContactController(container, navigationService){
    
    var self = this;
    
    self.run = function(){
        var contactListViewModel = container.resolve("contactListViewModel");
        navigationService.RegisterView("contactlist", new View("contactlist", "modules/contactmodule/contactlist/ContactListView.htm", contactListViewModel));
        
        var contactAddViewModel = container.resolve("contactAddViewModel");
        navigationService.RegisterView("contactadd", new View("contactadd", "modules/contactmodule/contactadd/ContactAddView.html", contactAddViewModel));
        
        var contactDetailsViewModel = container.resolve("contactDetailsViewModel");
        navigationService.RegisterView("contactdetails", new View("contactdetails", "modules/contactmodule/contactdetails/ContactDetailsView.html", contactDetailsViewModel));
    };
}

