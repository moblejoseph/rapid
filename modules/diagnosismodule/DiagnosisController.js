function DiagnosisController(container,regionManager){
    var self = this;
    
    self.run = function(){
        var logMessageViewModel = container.resolve("logMessageViewModel");
        regionManager.RegisterView("logmessage", new View("logmessage", "modules/diagnosismodule/logmessage/LogMessageView.html", logMessageViewModel));
    };
}