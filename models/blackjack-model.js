const mongoose = require('mongoose')

const blackjackSchema = new mongoose.Schema({
    _id: String,
    cards: {
        type: [Number],
        default: Array(52).fill().map((_, idx) => idx)
    },
    decks: {
        type: Number,
        default: 1,
    },
    players: {
        type: [{
            hand: [Number],
            name: String,
            lose: Boolean,
            win: Boolean,
            ready: Boolean,
            points: Number,
            wins: Number,
            loses: Number,
        }],
        default: []
    },
    house: {
        hand: [Number],
        points: Number,
        lose: Boolean,
        win: Boolean,
    },
    state: {
        type: String,
        default: 'PLAYING'
    },
});

module.exports = mongoose.model('BlackJack', blackjackSchema);
