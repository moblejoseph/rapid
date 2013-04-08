// ********************** Dictionary *****************************
function Dictionary(obj)
{
    var self = this;
    
    self.length = 0;
    
    self.items = {};
    
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            self.items[p] = obj[p];
            self.length++;
        }
    }

    self.setItem = function(key, value)
    {
        var previous = undefined;
        if (self.hasItem(key)) {
            previous = self.items[key];
        }
        else {
            self.length++;
        }
        self.items[key] = value;
        return previous;
    };

    self.getItem = function(key) {
        return self.hasItem(key) ? self.items[key] : undefined;
    };

    self.hasItem = function(key)
    {
        return self.items.hasOwnProperty(key);
    };
   
    self.removeItem = function(key)
    {
        if (self.hasItem(key)) {
            previous = self.items[key];
            self.length--;
            delete self.items[key];
            return previous;
        }
        else {
            return undefined;
        }
    };

    self.keys = function()
    {
        var keys = [];
        for (var k in self.items) {
            if (self.hasItem(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    self.values = function()
    {
        var values = [];
        for (var k in self.items) {
            if (self.hasItem(k)) {
                values.push(self.items[k]);
            }
        }
        return values;
    };

    self.each = function(fn) {
        for (var k in self.items) {
            if (self.hasItem(k)) {
                fn(k, self.items[k]);
            }
        }
    };

    self.clear = function()
    {
        self.items = {};
        self.length = 0;
    };
}

// ************************* Log *********************************************
function Log(log, type){
    
    var self = this;
    
    self.getISODateTime = function(d){
        var s = function(a,b){return(1e15+a+"").slice(-b)};

        if (typeof d === 'undefined'){
            d = new Date();
        };

        return d.getFullYear() + '-' +
            s(d.getMonth()+1,2) + '-' +
            s(d.getDate(),2) + ' : ' +
            s(d.getHours(),2) + ':' +
            s(d.getMinutes(),2) + ':' +
            s(d.getSeconds(),2);
    };
    
    self.log = log;
    self.datetime = self.getISODateTime(new Date());
    self.type = type;
    
    self.message = ko.computed(function(){
        return self.datetime + self.log;
    });
    
    self.logtype = ko.computed(function(){
        return self.type;
    });
};   

function Dependency(mode, key, type){
    var self = this;
    self.mode = mode;
    self.key = key;
    self.type = type;
    self.instanceCount = 0;
    self.lastInstance = null;
}

function View(viewName, viewUrl, viewModel) {

    var self = this;

    self.viewName = viewName;
    self.viewUrl = viewUrl;
    self.isLoaded = false;
    self.viewContent = null;
    self.viewModel = viewModel;
}
