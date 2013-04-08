function DiagnosisController(injector,regionManager){
    var self = this;
    
    self.run = function(){
        var logMessageViewModel = injector.resolve("logMessageViewModel");
        regionManager.RegisterView("logmessage", new View("logmessage", "modules/diagnosismodule/logmessage/LogMessageView.html", logMessageViewModel));
    };
}