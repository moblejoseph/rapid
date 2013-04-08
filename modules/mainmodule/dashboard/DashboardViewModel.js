function DashboardViewModel() {
	var self = this;

	self.loadView = function() {
		WebApp.NavigationService.Navigate("view1");
	};
	self.loadView2 = function() {
		WebApp.NavigationService.Navigate("view2");
	};
};