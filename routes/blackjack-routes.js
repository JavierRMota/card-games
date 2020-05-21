module.exports = function (app) {
    const bjController = require('../controllers/blackjack-controller');
    app.route('/test/').get(bjController.test);
}