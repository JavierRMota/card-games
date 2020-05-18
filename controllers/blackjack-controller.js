const Player=require('../models/blackjack-player-model')
const BlackJack = require('../models/blackjack-model')
const getNewHand = (blackjack) => {
    const cardOneIndex = Math.floor(Math.random() * blackjack.cards.length);
    const cardOne = blackjack.cards[cardOneIndex]
    blackjack.cards.splice(cardOneIndex,1)
    const cardTwoIndex = Math.floor(Math.random() * blackjack.cards.length);
    const cardTwo = blackjack.cards[cardTwoIndex]
    blackjack.cards.splice(cardTwoIndex,1)
    await blackjack.save()
    return [cardOne,cardTwo]
}
const getPlayer = (blackjack, name) => {
    let index = 0
    blackjack.players.forEach(player => {
        if (player.name  === name) {
            return { index, player }
        }
        index ++
    });
    return { index: -1, player: null}
}

exports.postCreateGame = async (req,res) => {
    const { body: { code }} = req
    try {
        const blackjack = new BlackJack({ _id: code })
        await blackjack.save()
        res.status(200).json({ code: blackjack.code })
    } catch (err) {
        res.status(409).json({ error: err })
    }
}
exports.putAddPlayer = async (req, res) => {
    const { body: { code, name }} = req
    try {
        const blackjack = await BlackJack.findOne({ _id: code });
        blackjack.players.forEach(oldPlayer => {
            if (oldPlayer.name  === name) {
                throw Error('Player exists')
            }
        });
        const player = new Player(getNewHand(blackjack),name)
        blackjack.players.push(player)
        await blackjack.save()
        res.status(200).json({ code: blackjack.code, player })
    } catch (err) {
        res.status(409).json({ error: err })
    }
}
exports.putGetCard = async (req, res) => {
    const { body: { code, name }} = req
    try {
        const blackjack = await BlackJack.findOne({ _id: code });
        const { index, player } = getPlayer(blackjack, name)
        if (index === -1) {
            throw Error('Player does not exists')
        }
        if (player.lose || player.win) {
            throw Error('Player cannot request card')
        }
        const cardIndex = Math.floor(Math.random() * blackjack.cards.length);
        const card = blackjack.cards[cardIndex]
        blackjack.cards.splice(cardIndex,1)
        player.hand.push(card)
        player.points += (card % 13) + 1 > 10 ? (card % 13) + 1 : 10
        if (player.points > 21) {
            player.lose = true
        } else if (player.hand.length > 4) {
            player.win = true
        }
        blackjack.players[index] = player
        await blackjack.save()
        res.status(200).send({ code: blackjack.code, player })
    } catch (err) {
        res.status(409).json({ error: err })
    }
}