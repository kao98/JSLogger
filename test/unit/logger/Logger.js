/**
 * Tests for the base class Logger.
 * Those tests may be consider as functional tests as
 * the tests for the 'base' class shall represent
 * various usage of the JSLogger using the default
 * writer.
 */
LoggerTest = TestCase("LoggerTest");

/**
 * We setUp our tests.
 */
LoggerTest.prototype.setUp = function () {

    // The default writer for the JSLogger class should use the
    // 'console' global object. The easiest way to test the
    // logger is then to spy the 'console' object to check
    // if it is properly called when it should be.

    sinon.spy(console, "log");  //Spy the console.log method
};

/**
 * We release the spies we set in the setUp method.
 */
LoggerTest.prototype.tearDown = function () {
    console.log.restore(); //Unwrapp the spy
};

/**
 * Simplest test / use we could do of the Logger:
 * KNT.LOGGER.log(message).
 * It should simply call console.log with the given message.
 */
LoggerTest.prototype.testLogger = function () {
    
//Given
    var logMessage = "test message";
    
//When
    KNT.LOGGER.log(logMessage);
    
//Then
    assertTrue(console.log.calledWith(logMessage));
    
};

/**
 * Another really simple usage of the Logger:
 * KNT.LOGGER.log(message, context) with a context array.
 * It should simply call the console.log method
 * with the given message after keys have been
 * processed (interpolated) using the context array.
 */
LoggerTest.prototype.testLoggerInterpolationArray = function () {
    
//Given
    var logMessage = "test message {0}, {1}, {2}",
        finalMessage = "test message test 0, then 1, and finaly 2";
    
//When
    KNT.LOGGER.log(logMessage, ['test 0', 'then 1', 'and finaly 2']);
    
//Then
    assertTrue(console.log.calledWith(finalMessage));
    
};

/**
 * Another really simple usage of the Logger:
 * KNT.LOGGER.log(message, context) with a context object.
 * It should simply call the console.log method
 * with the given message after keys have been
 * processed (interpolated) using the context object.
 */
LoggerTest.prototype.testLoggerInterpolationObject = function () {
    
//Given
    var logMessage = "test message {Hey}, {p-f}",
        finalMessage = "test message You, Pink Floyd";
    
//When
    KNT.LOGGER.log(logMessage, {Hey: 'You', 'p-f': 'Pink Floyd'});
    
//Then
    assertTrue(console.log.calledWith(finalMessage));
    
};

/**
 * We test that the log function can manage 3 arguments by adding
 * the level.
 */
LoggerTest.prototype.testLogWith3Arguments = function () {
    
//Given
    var logMessage = "test message {Hey}, {p-f}",
        finalMessage = "test message You, Pink Floyd";
    
//When
    KNT.LOGGER.log('critic', logMessage, {Hey: 'You', 'p-f': 'Pink Floyd'});
    
//Then
    assertTrue(console.log.calledWith(finalMessage));
    
};

/**
 * The logger don't have to do anything when we ask to log
 * with a level lower than the specified one.
 * This test allow us to test the 'setLevel' method too.
 */
LoggerTest.prototype.testSetLevel = function () {
    
//Given
    var logMessage = "test message {Hey}, {p-f}";
    
//When
    KNT.LOGGER.setLevel('warning');
    KNT.LOGGER.log('warn', logMessage);
    KNT.LOGGER.log('info', 'shouldn\'t be logged.');
    
//Then
    assertTrue(console.log.calledWith(logMessage));
    assertTrue(console.log.calledOnce);
    
};

/**
 * Test that the logger work well with numeric level values too
 */
LoggerTest.prototype.testNumericLevel = function () {
    
//Given
    var logMessage = "test message {Hey}, {p-f}";
    
//When
    KNT.LOGGER.setLevel(KNT.LOGGER.LOG_LEVEL.ERROR);
    KNT.LOGGER.log(KNT.LOGGER.LOG_LEVEL.ALERT, logMessage);
    KNT.LOGGER.log(KNT.LOGGER.LOG_LEVEL.INFO, 'shouldn\'t be logged.');
    
//Then
    assertTrue(console.log.calledWith(logMessage));
    assertTrue(console.log.calledOnce);
    
};

/**
 * The logger should emit errors if trying to pass
 * wrong string values for the levels.
 */
LoggerTest.prototype.testErrorOnWrongLevel = function () {
    
//Given
    var wrongLevel = 'wrong';
    
//When
    assertException(function () {
            KNT.LOGGER.setLevel(wrongLevel);
        },
        
//Then
        "Error"
    );

// Same thing with the log method

//When
    assertException(function () {
            KNT.LOGGER.log(wrongLevel, 'Message');
        },
        
//Then
        "Error"
    );
    
};


/**
 * A quick test to verify the method chaining.
 */
LoggerTest.prototype.testMethodChaining = function () {
    
//Given
    var logMessage  = "test message",
        logLevel    = KNT.LOGGER.LOG_LEVEL.ERROR;
    
//When

    KNT.LOGGER
        .setLevel(logLevel)
        .setWriter(KNT.LOGGER.getWriter())
        .log(KNT.LOGGER.LOG_LEVEL.ALERT, logMessage)

        //No log: the default level is INFO, but we set the curent level to ERROR
        .log(logMessage)

        //Should work: we lowerCase the level in the LOGGER.
        //TODO: lowercase or uppercase for the level in the library?
        .log('EMERGENCY', logMessage);
    
//Then
    assertTrue(console.log.calledWith(logMessage));
    assertEquals(KNT.LOGGER.Level, logLevel);
    assertEquals(console.log.callCount, 2);
    
};