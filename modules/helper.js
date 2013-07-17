module.exports = function() {

    var log = function(log) {
        var timestamp = new Date();

        console.log(timestamp + ' - ' + log);
    };

    return {
        log: log
    };

};