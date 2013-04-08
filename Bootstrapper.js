function Bootstrapper() {
    
    var self = this;
    
    self.modules = new Dictionary();
    self.context = new Context();
    
    self.registerCore = function(){
        self.context.injector.registerSingle("logger", "LogService");
        self.context.injector.registerSingle("regionManager", "RegionManager");
        self.context.injector.registerSingle("eventAggregator", "EventAggregator");
    };
    
    self.registerModule = function(modulename, module){
        self.context.logger.log("Registering " + modulename + " to Bootstrapper");
        self.modules.setItem(modulename, module);
        self.context.injector.register(module, module);
    };
    
    self.registerModules = function(){
        WebApp.Require(['modules/navigationModule/NavigationModule.js',
            'modules/diagnosismodule/DiagnosisModule.js',
            'modules/mainmodule/MainModule.js',
            'modules/menumodule/MenuModule.js',
            'modules/contactmodule/ContactModule.js'], function() {
            
            self.registerModule("Navigation Module", "NavigationModule");
            self.registerModule("Diagnosis Module", "DiagnosisModule");
            self.registerModule("Main Module", "MainModule");
            self.registerModule("Menu Module", "MenuModule");
            self.registerModule("Contact Module", "ContactModule");
            
            self.start();
        });
    };
    
    self.Init = function(){
        self.registerCore();
        self.registerModules();
    };
    
    self.start = function(){
        self.modules.each(function(k,v){
            var module = self.context.injector.resolve(v);
            module.init(self.context);
            self.context.logger.log("Initiating " + k);
        });
    };
}

$(document).ready(function() {
    var bootstrapper = new Bootstrapper();
    bootstrapper.Init();
});