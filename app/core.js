var WebApp = {};

// ****************** Constants ********************************


// ****************** Load Functions ***************************

WebApp.ScriptLoaded = function(url) {
	scripts = document.getElementsByTagName('script');
	for(var i = 0; i < scripts.length; i++) {
		if(scripts[i].src === url)
			return true;
	}
	return false;
};

WebApp.LoadScript = function(url, callback) {
	var fullUrl = WebApp.Root + url;
	if(!WebApp.ScriptLoaded(fullUrl)) {
		var script = document.createElement("script");
		script.type = "text/javascript";

		if(script.readyState) {//IE
			script.onreadystatechange = function() {
				if(script.readyState === "loaded" || script.readyState === "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {//Others
			script.onload = function() {
				callback();
			};
		}

		script.src = url;
		document.getElementsByTagName("body")[0].appendChild(script);
	} else {
		console.logWarning("Script " + url + " is already loaded");
		callback();
	}
};

WebApp.Require = function(urls, callback) {
	var i = 0; (function loadNextScript() {
		if(i < urls.length) {
			WebApp.LoadScript(urls[i], function() {++i;
				loadNextScript();
			});
		} else if(callback)
			callback();
	})();
};
// ******************  Utility Functions ***********************

WebApp.StringToFunction = function(str, type) {
    type = type || "object";  // can pass "function"
    var arr = str.split(".");

    var fn = (window || this);
    for (var i = 0, len = arr.length; i < len; i++) {
        fn = fn[arr[i]];
    }
    if (typeof fn !== type) {
        throw new Error(type +" not found: " + str);
    }

    return  fn;
};

WebApp.Namespace = function(name) {
	var parts = name.split('.');
	var current = WebApp;
	for(var i in parts) {
		if(!current[parts[i]]) {
			current[parts[i]] = {};
		}
		current = current[parts[i]];
	}
};

WebApp.IsNull = function(obj) {
	if( typeof obj === "undefined")
		return true;
	else
		return false;
};

WebApp.IsPropertyPathNull = function(obj /*, level1, level2, ... levelN*/) {
	var args = Array.prototype.slice.call(arguments), obj = args.shift();

	for(var i = 0; i < args.length; i++) {
		if(!obj.hasOwnProperty(args[i])) {
			return false;
		}
		obj = obj[args[i]];
	}
	return true;
};
