LoggerTest = TestCase("LoggerTest");

LoggerTest.prototype.setUp = function () {
    sinon.spy(console, "log");  //Spy the console.log method
};

LoggerTest.prototype.tearDown = function () {
    console.log.restore(); //Unwrapp the spy
};

LoggerTest.prototype.testLogger = function () {
    
    //Given
    var logMessage = "test message";
    
    //When
    KNT.LOGGER.log(logMessage);
    
    //Then
    assertTrue(console.log.calledWith(logMessage));
    
};

LoggerTest.prototype.testLoggerInterpolation = function () {
    
    //Given
    var logMessage = "test message {0}, {1}, {2}",
        finalMessage = "test message test 0, then 1, and finaly 2";
    
    //When
    KNT.LOGGER.log(logMessage, ['test 0', 'then 1', 'and finaly 2']);
    
    //Then
    assertTrue(console.log.calledWith(finalMessage));
    
};
