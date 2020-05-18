const mongoose=require('mongoose')

const blackjackSchema = new mongoose.Schema({
    _id: String,
    cards:{
        type:[Number],
        default: Array(52).fill().map((_, idx) => 1 + idx)
    },
    players: [Schema.Types.Mixed],
    house:{
        hand: {
          type:[Number]
        }
    }
});

module.exports= mongoose.model('BlackJack', blackjackSchema);
