
var console = console || {
    log: function () {}
};

KNT.LOGGER = {
    author:     'AR',
    revision:   '01',
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

//The default writer is realy ... realy dumb.
KNT.LOGGER.Writer = {
    write: function (level, message) {
        console.log(message);
    }
};

KNT.LOGGER.Level = KNT.LOGGER.LOG_LEVEL.INFO;