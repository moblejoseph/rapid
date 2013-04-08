//*********************** Navigation Service ****************************
function NavigationService(logger) {

    var self = this;

    self.nav = "#nav";
    self.navRegion = "nav";

    self.views = new Dictionary();
    self.navigationHistory = [];
    self.history = window.History;
    
    self.history.Adapter.bind(window,'statechange',function(){
        var state = self.history.getState();
        if(state){
            self.Navigate(state.data.view);
        };
    });
    
    self.LoadView = function(viewName, viewContent, viewModel) {
        var navNode = document.getElementById(self.navRegion);
        $(self.nav).hide("fast", function() {
            $(self.nav).html(viewContent);
            ko.applyBindings(viewModel, navNode);
            $(self.nav).show("slow");
            
            logger.log("Navigated to "+ viewName);
        });
    };

    self.Navigate = function(viewName) {
        
        self.navigationHistory.push(viewName);
        
        logger.log("Navigating to "+ viewName);
        
        var selectedView = self.views.getItem(viewName);
        if (!WebApp.IsNull(selectedView)) {
            if (!selectedView.isLoaded) {
                var viewUrl = selectedView.viewUrl;
                var viewModel = selectedView.viewModel;

                $.get(viewUrl, function(data) {

                    selectedView.isLoaded = true;
                    selectedView.viewContent = data;

                    logger.log(viewName + " loaded Remotely and navigating");
                    self.LoadView(viewName, data, viewModel);
                });
            } else {
                var viewContent = selectedView.viewContent;
                var viewModel = selectedView.viewModel;

                logger.log(viewName + " loaded from Cache and navigating");
                self.LoadView(viewName, viewContent, viewModel);

            }
            
            // Modify Browser History
            self.history.pushState({view: viewName}, viewName, "?action=" + viewName);
            
        } else {
            logger.logError(viewName + " not Found");
            self.LoadView(viewName, "Error, View not Found, Please check whether the view is registered or not", null);
        }
    };

    self.RegisterView = function(viewName, view) {
        logger.log("Registering "+ viewName + " to NavigationService");
        self.views.setItem(viewName, view);
    };
    
    self.GoBack = function(){
        var lastView = self.navigationHistory[self.navigationHistory.length -2];
        self.Navigate(lastView);
    };
}