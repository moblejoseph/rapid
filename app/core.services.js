// *********************** FileManager (fileManager) ***************************************
function FileManager(logger) {

    var self = this;

    self.loadedScripts = [];

    self.scriptLoaded = function(url) {

        for (var i = 0; i < self.loadedScripts.length; i++) {
            if (self.loadedScripts[i].key === url)
                return true;
        }

        return false;
    };

    self.loadScript = function(url, callback) {

        if (!self.scriptLoaded(url)) {
            var script = document.createElement("script");
            script.type = "text/javascript";

            if (script.readyState) {//IE
                script.onreadystatechange = function() {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            }
            else {//Others
                script.onload = function() {
                    callback();
                };
            }

            script.src = url;
            self.loadedScripts.push({"key": url, "src": script.src});
            document.getElementsByTagName("body")[0].appendChild(script);
        }
        else {
            logger.logError("Script " + url + " is already loaded");
            callback();
        }
    };

    self.require = function(urls, callback) {
        var i = 0;
        (function loadNextScript() {
            if (i < urls.length) {
                self.loadScript(urls[i], function() {
                    ++i;
                    loadNextScript();
                });
            }
            else if (callback)
                callback();
        })();
    };
};

// *********************** Container (container) ***************************************
function Container() {

    var self = this;
    self.dependencies = new Dictionary();

    self.applyConstructor = function(ctor, args) {
        // Triangle of hackery which handles host object constructors and intrinsics
        switch (args.length) {
            case 0:
                return new ctor;
            case 1:
                return new ctor(args[0]);
            case 2:
                return new ctor(args[0], args[1]);
            case 3:
                return new ctor(args[0], args[1], args[2]);
            case 4:
                return new ctor(args[0], args[1], args[2], args[3]);
            case 5:
                return new ctor(args[0], args[1], args[2], args[3], args[4]);
            case 6:
                return new ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
            case 7:
                return new ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            case 8:
                return new ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
            case 9:
                return new ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
        }
    };

    self.createInstance = function(name) {
        var target = WebApp.StringToFunction(name, "function");
        var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
        var text = target.toString();
        var args = text.match(FN_ARGS)[1].split(',');
        return self.applyConstructor(target, self.getDependencies(args));
    };

    self.resolve = function(key) {
        if (self.dependencies.hasItem(key))
        {
            var dp = self.dependencies.getItem(key);
            switch (dp.mode)
            {
                case "instance":
                    {
                        if (dp.lastInstance === null)
                            dp.lastInstance = dp.type;

                        return dp.lastInstance;
                    }
                case "single":
                    {
                        if (dp.lastInstance === null)
                        {
                            var instance = self.createInstance(dp.type);
                            dp.lastInstance = instance;
                        }
                        return dp.lastInstance;
                    }
                case "multiple":
                    {
                        var instance = self.createInstance(dp.type);
                        dp.instanceCount++;
                        dp.lastInstance = instance;
                        return instance;
                    }
            }
        }
        else
            return null;
    };

    self.getDependencies = function(arr) {
        return arr.map(function(value) {
            value = $.trim(value);
            if (value === 'container')
                return self;
            else
            {
                var dp = self.dependencies.getItem(value);
                if (dp)
                    return self.resolve(dp.key);
            }
        });
    };

    self.registerInstance = function(key, dependency) {
        var dp = new Dependency("instance", key, dependency);
        this.dependencies.setItem(key, dp);
    };

    self.register = function(key, dependency) {
        var dp = new Dependency("multiple", key, dependency);
        this.dependencies.setItem(key, dp);
    };

    self.registerSingle = function(key, dependency) {
        var dp = new Dependency("single", key, dependency);
        this.dependencies.setItem(key, dp);
    };
}

//************************ EventManager Service (eventManager) ***********************
function EventManager() {

    var self = this;

    self.subscriptions = [];

    self.Subscribe = function(name, callback) {
        self.subscriptions.push({"name": name, "callback": callback});
        return [name, callback];
    };

    self.UnSubscribe = function(args) {
        for (x = 0; x < self.subscriptions.length; x++) {
            if (self.subscriptions[x].name === args[0], self.subscriptions[x].callback === args[1])
                self.subscriptions.splice(x, 1);
        }
    };

    self.Publish = function(name, args) {
        var temp = [];
        if (self.subscriptions.length > 0) {
            for (var x = 0; x < self.subscriptions.length; x++) {
                if (self.subscriptions[x].name === name)
                    temp.push({"fn": self.subscriptions[x].callback});
            }
            for (x = 0; x < temp.length; x++) {
                temp[x].fn.apply(this, [args]);
            }
        }
    };
}

// *********************** Logger Service (logger) ************************
function Logger() {

    var self = this;

    self.logs = ko.observableArray();

    self.log = function(log) {
        self.logs.push(new Log(log, "info"));
        console.log(log);
    };

    self.logError = function(log) {
        self.logs.push(new Log(log, "error"));
        console.log(log);
    };

    self.logWarning = function(log) {
        self.logs.push(new Log(log, "warning"));
        console.log(log);
    };
}

// *********************** RegionManager (regionManager) ************************
function RegionManager(logger) {

    var self = this;

    self.views = new Dictionary();

    self.RegionExists = function(regionName) {

        var regionNode = document.getElementById(regionName);

        if (regionNode)
            return true;
        else
            return false;
    };

    self.LoadViewToRegion = function(regionName, viewContent, viewModel) {

        var regionNode = document.getElementById(regionName);
        if (regionNode) {
            regionNode.innerHTML = viewContent;
            ko.applyBindings(viewModel, regionNode);
        }
    };

    self.RegisterView = function(regionName, view) {

        logger.log("Registering " + view.viewName + " to RegionManager");

        if (self.RegionExists(regionName)) {

            if (!view.isLoaded) {
                var viewUrl = view.viewUrl;
                var viewModel = view.viewModel;

                $.get(viewUrl, function(data) {

                    view.isLoaded = true;
                    view.viewContent = data;

                    self.LoadViewToRegion(regionName, data, viewModel);
                    logger.log(view.viewName + " view loaded Remotely and added to " + regionName + " Region");

                });
            }
            else {
                var viewContent = view.viewContent;
                var viewModel = view.viewModel;

                self.LoadViewToRegion(regionName, viewContent, viewModel);
                logger.log(view.viewName + " view loaded from Cache and added to " + regionName + " Region");
            }
        }
        else {
            logger.logError("Region \"" + regionName + "\" not found");
        }

        self.views[regionName] = view;
    };
}

// *********************** DataManager Service ************************
function DataManager() {

    var self = this;
}