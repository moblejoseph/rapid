function DiagnosisModule(container, fileManager) {
    
    var self = this;
    
    //WebApp.EventAggregator.Subscribe("log", function(message){ alert(message); });
    
    self.init = function() {
        fileManager.require(['modules/diagnosismodule/DiagnosisController.js', 
                             'modules/diagnosismodule/logmessage/LogMessageViewModel.js'], function() {
            
            container.register("logMessageViewModel", "LogMessageViewModel");
            container.register("diagnosisController", "DiagnosisController");
            
            container.resolve("diagnosisController").run();
        });
    };
};


