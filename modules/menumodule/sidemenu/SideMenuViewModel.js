function SideMenuViewModel(navigationService) {
    var self = this;

    self.loadView = function() {
        navigationService.Navigate("dashboard2");
    };
    self.loadContacts = function() {
        navigationService.Navigate("contactlist");
    };
};