
/**
 * Set the level of logs.
 * By default, if you set any log level before using the LOGGER,
 * the level is 'INFO'.
 * 
 * Available levels are:
 *     EMERGENCY:  10,
 *     ALERT:      20,
 *     CRITICAL:   30,
 *     ERROR:      40,
 *     WARNING:    50,
 *     NOTICE:     60,
 *     INFO:       70,
 *     DEBUG:      80
 * 
 * You can set the level using an object that defines those constants:
 * KNT.LOGGER.LOG_LEVEL.
 * 
 * You can also directly use the number associated with the level.
 * 
 * Actualy, you can set the level using any number as the logger will
 * check the log level using the aritmetic operator '<='. That let you
 * define your own log levels.
 *  
 * You can also set the level using a string defined in the 
 * KNT.LOGGER.LEVELS array. Available strings are:
 * 
 *     EMERGENCY:  'emergency',
 *     ALERT:      'alert',
 *     CRITICAL:   'critic',
 *     ERROR:      'error',
 *     WARNING:    'warn',
 *     NOTICE:     'note',
 *     INFO:       'info',
 *     DEBUG:      'debug'
 *  
 * @param {String|Number} level The level of logs
 * @returns {KNT.LOGGER} an instance of the LOGGER for method chaining.
 * @example
 * 
 * KNT.LOGGER.setLevel(KNT.LOGGER..LOG_LEVEL.WARNING);
 * KNT.LOGGER.setLevel(50);
 * KNT.LOGGER.setLevel('warn');
 * 
 * //All calls are equals 
 * //but the first one is performant plus is human-readable.
 * 
 */
KNT.LOGGER.setLevel = function (level) {
    
    KNT.LOGGER.Level = 
        typeof level !== "string"
            ? level
            : KNT.LOGGER._retrieveLevelValueFromString(level)
    ;
    
    return KNT.LOGGER;
    
};

/**
 * Polyfill Array.prototype.indexOf
 * Implementation from the Mozilla Developer Network.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
 * 
 * These LOGGER object is not here to change anything to the 
 * environment where it is used, so we don't alter Array.prototype.
 * 
 * Use this with apply() or call() to be sure to affect 'this' properly.
 * 
 * @type Function
 */
KNT.LOGGER.__array_indexOf__ = 
    Array.prototype.indexOf
    || function (searchElement, fromIndex) {
        
    if ( this === undefined || this === null ) {
        throw new TypeError( '"this" is null or not defined' );
    }

    var length = this.length >>> 0; // Hack to convert object.length to a UInt32

    fromIndex = +fromIndex || 0;

    if (Math.abs(fromIndex) === Infinity) {
        fromIndex = 0;
    }

    if (fromIndex < 0) {
        fromIndex += length;
        if (fromIndex < 0) {
            fromIndex = 0;
        }
    }

    for (;fromIndex < length; fromIndex++) {
        if (this[fromIndex] === searchElement) {
            return fromIndex;
        }
    }

    return -1;
};

/**
 * This 'private' method retrive the numerical representation of
 * a level giving its string reprensentation.
 * 
 * @param {String} level 
 * @returns {levelNumber|Number}
 * @example
 * 
 * KNT.LOGGER._retrieveLevelValueFromString('emergency'); //result: 10
 * 
 */
KNT.LOGGER._retrieveLevelValueFromString = function (level) {
    
    level = level.toLowerCase();
    
    switch (level) {
        case 'critical':
            level = 'critic';
            break;
            
        case 'warning':
            level = 'warn';
            break;
            
        case 'notice':
            level = 'note';

    }
    
    levelNumber = 
        KNT.LOGGER.__array_indexOf__.call(KNT.LOGGER.LEVELS, level.toLowerCase());
    
    if (levelNumber === -1) {
        throw new Error(KNT.LOGGER.interpolate(
            "'{level}' is not a valid level",
            {'level': level.toString()}
        ));
    }
    
    return levelNumber;
    
};

/**
 * Set the writer the LOGGER must use.
 * 
 * A writer may be any object implementing a 'write' method.
 * This writer.write() method must take two arguments: a level and a message.
 * write(level, message);
 * 
 * The write() method don't have to process the level as it is done
 * by the LOGGER itself. It is actualy used in post-process purpose
 * like calling the right method of the global 'console' object
 * (console.info(), console.warn(), ...) for example.
 * 
 * The 'level' passed to the write() method is in a string form.
 * The default levels are defined with those strings:
 * 
 *     EMERGENCY:  'emergency',
 *     ALERT:      'alert',
 *     CRITICAL:   'critic',
 *     ERROR:      'error',
 *     WARNING:    'warn',
 *     NOTICE:     'note',
 *     INFO:       'info',
 *     DEBUG:      'debug'
 * 
 * @param {object} writer the writer the LOGGER must use.
 * @returns {KNT.LOGGER} an instance of the LOGGER for method chaining.
 */
KNT.LOGGER.setWriter = function (writer) {

    KNT.LOGGER.Writer = writer;
    
    return KNT.LOGGER;
    
};

/**
 * Return the writer used by the LOGGER.
 * @returns {object|KNT.LOGGER.Writer}
 */
KNT.LOGGER.getWriter = function () {
    
    return KNT.LOGGER.Writer;
    
};

/**
 * Interpolate a message given a context.
 * @Example
 * KNT.LOGGER.interpolate('{hi} world!', ['hi': 'Hello']); 
 * //should return 'Hello world!'
 * @param {String} message
 * @param {Array} context
 * @returns {String}
 */
KNT.LOGGER.interpolate = function (message, context) {
    
    if (Object.prototype.toString.call(arguments[1]) === '[object Array]') {
        for (var i = 0; i < context.length; i++) {
            message = message.replace('{' + i + '}', context[i]);
        }
    } else {
        for (var property in context) { if (context.hasOwnProperty(property)) {
            message = message.replace('{' + property + '}', context[property]);
        }}
    }
    
    return message;
};

/**
 * Log a message using the writer affected to the LOGGER.
 * The log method accept from one to three arguments.
 * 
 * If only one argument is provided, it is consider as the message to log.
 * If two arguments are provided:
 *  - if the second one is an Array, it will be a context, so the first one
 *    will be the message to log.
 *  - else, the first will be a level, then the second the message.
 * If three arguments are provided, the first one will be the level,
 * the second one the message to log, then if the third one is an Array,
 * it will be a context.
 * 
 * If no level is provided, it will use the level INFO by default.
 * 
 * @example
 * 
 * //The following example all logs the same message: Hello World.
 * KNT.LOGGER.log('Hello world!');
 * KNT.LOGGER.log(KNT.LOGGER.LOG_LEVEL.INFO, 'Hello World!');
 * KNT.LOGGER.log('info', 'Hello World!');
 * KNT.LOGGER.log('{0} World!', ['Hello']);
 * KNT.LOGGER.log(KNT.LOGGER.LOG_LEVEL.INFO, '{Hi} World!', ['Hi': 'Hello']);
 * 
 * @returns {undefined}
 */
KNT.LOGGER.log = function () {
    
    var level   = KNT.LOGGER.LOG_LEVEL.INFO, //Default level of this method is "INFO"
        message = ""                         // ... you know it!
    ;
    
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
        if (typeof arguments[1] !== 'string') {
            //The last argument is an array: this is a context.
            message = this.interpolate(arguments[0], arguments[1]);
        } else {
            //The last argument isn't an array, this is probably a string, so the message,
            //so the first one is the level.
            level   = arguments[0];
            message = arguments[1];
        }
    }
  
    if (typeof level === "string") {
        level = KNT.LOGGER._retrieveLevelValueFromString(level);
    }
    
    if (level <= this.Level) {
        this.getWriter().write(level, message);
    }
    
    return KNT.LOGGER;
};