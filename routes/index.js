
/*
*   GET home page
*/

exports.index = function(request, response) {

    response.render('index', { ENVIRONMENT: request.GLOBALS.ENVIRONMENT });

};