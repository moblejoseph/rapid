function LogMessageViewModel(logger) {
    var self = this;
    
    self.logmessages = ko.computed(function(){
        return logger.logs();
    }, self);
}

