function Bootstrapper() {
    
    var self = this;
    
    self.modules = new Dictionary();
    self.logger = new Logger();
    self.container = new Container();
    
    self.registerCore = function(){
        self.container.registerSingle("logger", "Logger");
        self.container.registerSingle("fileManager", "FileManager");
        self.container.registerSingle("regionManager", "RegionManager");
        self.container.registerSingle("eventManager", "EventManager");        
    };
    
    self.registerModule = function(modulename, module){
        self.logger.log("Registering " + modulename + " to Bootstrapper");
        self.modules.setItem(modulename, module);
        self.container.register(module, module);
    };
    
    self.registerModules = function(){
        var fileManager = self.container.resolve("fileManager");
        fileManager.require(['modules/navigationModule/NavigationModule.js',
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
            var module = self.container.resolve(v);
            module.init();
            self.logger.log("Initiating " + k);
        });
    };
}

$(document).ready(function() {
    var bootstrapper = new Bootstrapper();
    bootstrapper.start();
});