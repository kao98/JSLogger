
KNT.LOGGER.setLevel = function (level) {
    //TODO: level from an int or from a string
    this.Level = level;
};

KNT.LOGGER.setWriter = function (writer) {
    this.Writer = writer;
};

KNT.LOGGER.getWriter = function () {
    return this.Writer;
};

KNT.LOGGER.interpolate = function (message, context) {
    if (Object.prototype.toString.call(arguments[1]) === '[object Array]') {
        for (var i = 0; i < context.length; i++) {
            message = message.replace('{' + i + '}', context[i]);
        }
    }
    return message;
};

KNT.LOGGER.log = function () {
    
    var level   = KNT.LOGGER.LOG_LEVEL.INFO, //Default level of this method is "INFO"
        message = "",                       // ... you know it!
        context = null;                     //the context ... see the doc about the 'interpolate' method to understand what this is.
        
    if (arguments.length === 1) {
        //If only one argument, we consider this is the message to log.
        message = arguments[0];
    } else if (arguments.length >= 3) {
        //If at least 3 arguments, we consider they are provide in the corect order: level, message, context.
        level   = arguments[0];
        message = this.interpolate(arguments[1], arguments[2]);
    } else {
        //If 2 arguments, maybe this is 'level + message', or 'message + context'.
        //The easiest way to test that is to check the instance of the last argument
        if (Object.prototype.toString.call(arguments[1]) === '[object Array]') {
            //The last argument is an array: this is a context.
            message = this.interpolate(arguments[0], arguments[1]);
        } else {
            //The last argument isn't an array, this is probably a string, so the message,
            //so the first one is the level.
            level   = arguments[0];
            message = arguments[1];
        }
    }
    
    if (level <= this.Level) {
        this.getWriter().write(level, message);
    }
    
};