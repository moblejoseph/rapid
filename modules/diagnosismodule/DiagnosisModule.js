function DiagnosisModule(injector) {
    
    var self = this;
    
    //WebApp.EventAggregator.Subscribe("log", function(message){ alert(message); });
    
    self.init = function() {
        WebApp.Require(['modules/diagnosismodule/DiagnosisController.js', 
                        'modules/diagnosismodule/logmessage/LogMessageViewModel.js'], function() {
            
            injector.register("logMessageViewModel", "LogMessageViewModel");
            injector.register("diagnosisController", "DiagnosisController");
            
            injector.resolve("diagnosisController").run();
        });
    };
};


