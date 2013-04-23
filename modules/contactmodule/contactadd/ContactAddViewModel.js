function ContactAddViewModel(navigationService) {
    var self = this;
    
    self.AddCommand = function() {
        navigationService.Navigate("contactlist");
    };
    
    self.CancelCommand = function(){
        navigationService.Navigate("contactlist");
    };
};