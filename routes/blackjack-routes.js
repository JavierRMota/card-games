module.exports = function (app) {
    const bjController = require('../controllers/blackjack-controller');
    app.route('/game/putPlayerReady').put(bjController.putPlayerReady)
    app.route('/game/getCard').put(bjController.putGetCard);
    app.route('/game/addPlayer').put(bjController.putAddPlayer);
    app.route('/games/createGame/').post(bjController.postCreateGame);
    app.route('/test/').get(bjController.test);
}

