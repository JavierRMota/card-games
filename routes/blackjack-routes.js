module.exports = function (app) {
    const bjController = require('../controllers/blackjack-controller');
    app.route('/game/putPlayerReady').post(bjController.putsPlayerReady)
    app.route('/game/getCard').post(bjController.putGetCard);
    app.route('/game/addPlayer').post(bjController.putAddPlayer);
    app.route('/games/createGame/').post(bjController.postCreateGame);
    app.route('/test/').get(bjController.test);
}

