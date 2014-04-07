
var console = console || {
    log: function () {}
};

KNT.LOGGER = {
    author:     'AR',
    revision:   '01'
};

KNT.LOGGER.LOG_LEVEL = {
    EMERGENCY:  10,
    ALERT:      20,
    CRITICAL:   30,
    ERROR:      40,
    WARNING:    50,
    NOTICE:     60,
    INFO:       70,
    DEBUG:      80
};

KNT.LOGGER.LEVELS = new Array();
KNT.LOGGER.LEVELS[KNT.LOGGER.LOG_LEVEL.EMERGENCY]   = 'emergency';
KNT.LOGGER.LEVELS[KNT.LOGGER.LOG_LEVEL.ALERT]       = 'alert';
KNT.LOGGER.LEVELS[KNT.LOGGER.LOG_LEVEL.CRITICAL]    = 'critic';
KNT.LOGGER.LEVELS[KNT.LOGGER.LOG_LEVEL.ERROR]       = 'error';
KNT.LOGGER.LEVELS[KNT.LOGGER.LOG_LEVEL.WARNING]     = 'warn';
KNT.LOGGER.LEVELS[KNT.LOGGER.LOG_LEVEL.NOTICE]      = 'note';
KNT.LOGGER.LEVELS[KNT.LOGGER.LOG_LEVEL.INFO]        = 'info';
KNT.LOGGER.LEVELS[KNT.LOGGER.LOG_LEVEL.DEBUG]       = 'debug';

//The default writer is realy ... realy dumb.
KNT.LOGGER.Writer = {
    write: function (level, message) {
        console.log(message);
    }
};

//Default logger level
KNT.LOGGER.Level = KNT.LOGGER.LOG_LEVEL.INFO;