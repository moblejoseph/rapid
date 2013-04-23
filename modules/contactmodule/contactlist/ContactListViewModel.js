function ContactListViewModel(container, navigationService) {
    var self = this;
    
    self.contacts = ko.observableArray([
            { type: "Client", firstName: 'Bert', lastName: 'Bertington' },
            { type: "Client", firstName: 'Bert', lastName: 'Bertington' },
            { type: "Client", firstName: 'Bert', lastName: 'Bertington' },
            { type: "Client", firstName: 'Bert', lastName: 'Bertington' },
            { type: "Client", firstName: 'Bert', lastName: 'Bertington' },
            { type: "Client", firstName: 'Bert', lastName: 'Bertington' },
            { type: "Client", firstName: 'Bert', lastName: 'Bertington' },
            { type: "Client", firstName: 'Bert', lastName: 'Bertington' },
            { type: "Client", firstName: 'Bert', lastName: 'Bertington' },
            { type: "Client", firstName: 'Bert', lastName: 'Bertington' }
        ]);
    
    self.ShowAddViewCommand = function(){
        navigationService.Navigate("contactadd");
    };

    self.ShowDetailsViewCommand = function(){
        navigationService.Navigate("contactdetails");
    };
    
    self.ShowEditViewCommand = function(){
        navigationService.Navigate("contactadd");
    };
    
    self.ShowDeleteViewCommand = function(contact) {
        self.contacts.remove(contact);
    };
};