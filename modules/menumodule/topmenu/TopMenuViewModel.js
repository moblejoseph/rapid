function TopMenuViewModel(navigationService) {
    var self = this;

    self.loadView = function() {
        navigationService.Navigate("contact");
    };
    self.loadView2 = function() {
        navigationService.Navigate("view2");
    };
};