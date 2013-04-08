function ContactListViewModel() {
    var self = this;
    
    self.addPage = "Add";
    self.editPage = "Edit";
    self.detailsPage = "Details";
    self.listPage = "List";
    self.currentPage = ko.observable(self.listPage);
    
    self.firstname = ko.observable();
    
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
    
    self.AddCommand = function() {
        if(self.currentPage() === self.addPage){
            self.contacts.push({ type: "Client", firstName: 'Bert', lastName: 'Bertington' });
        }
        else{
            
        }

        self.currentPage(self.listPage);
    };
    
    self.CancelCommand = function(){
        self.currentPage(self.listPage);
    };
    
    self.ShowAddViewCommand = function(){
        self.currentPage(self.addPage);
    };
    
    self.ShowDetailsViewCommand = function(){
        self.currentPage(self.detailsPage);
    };
    
    self.ShowEditViewCommand = function(){
        self.currentPage(self.editPage);
    };
    
    self.ShowDeleteViewCommand = function(contact) {
        self.contacts.remove(contact);
    };
};