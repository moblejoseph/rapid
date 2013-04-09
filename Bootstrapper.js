function Bootstrapper() {
    
    var self = this;
    
    self.modules = new Dictionary();
    self.context = new Context();
    
    self.registerCore = function(){
        self.context.container.registerSingle("logger", "Logger");
        self.context.container.registerSingle("regionManager", "RegionManager");
        self.context.container.registerSingle("eventManager", "EventManager");
    };
    
    self.registerModule = function(modulename, module){
        self.context.logger.log("Registering " + modulename + " to Bootstrapper");
        self.modules.setItem(modulename, module);
        self.context.container.register(module, module);
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
            
            self.startModules();
        });
    };
    
    self.start = function(){
        self.registerCore();
        self.registerModules();
    };
    
    self.startModules = function(){
        self.modules.each(function(k,v){
            var module = self.context.container.resolve(v);
            module.init(self.context);
            self.context.logger.log("Initiating " + k);
        });
    };
}

$(document).ready(function() {
    var bootstrapper = new Bootstrapper();
    bootstrapper.start();
});