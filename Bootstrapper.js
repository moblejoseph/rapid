function Bootstrapper() {
    
    var self = RapidBootstrapper();
    
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
    
    return self;
}