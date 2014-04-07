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
 * KNT.LOGGER.log(message, context) with a context.
 * It should simply call the console.log method
 * with the given message after keys have been
 * processed (interpolated) using the context array.
 */
LoggerTest.prototype.testLoggerInterpolation = function () {
    
    //Given
    var logMessage = "test message {0}, {1}, {2}",
        finalMessage = "test message test 0, then 1, and finaly 2";
    
    //When
    KNT.LOGGER.log(logMessage, ['test 0', 'then 1', 'and finaly 2']);
    
    //Then
    assertTrue(console.log.calledWith(finalMessage));
    
};
