function ContactDetailsViewModel(navigationService) {
    var self = this;

    self.CancelCommand = function(){
        navigationService.Navigate("contactlist");
    };
};