const Player = require('../models/blackjack-player-model')
const BlackJack = require('../models/blackjack-model')
const updateGame = (blackjack) => {
    //PROXY FUNCTION TO CALL AFTER EVERY UPDATE
}
const getNewHand = async (blackjack) => {
    const cardOneIndex = Math.floor(Math.random() * blackjack.cards.length);
    const cardOne = blackjack.cards[cardOneIndex]
    blackjack.cards.splice(cardOneIndex, 1)
    const cardTwoIndex = Math.floor(Math.random() * blackjack.cards.length);
    const cardTwo = blackjack.cards[cardTwoIndex]
    blackjack.cards.splice(cardTwoIndex, 1)
    await blackjack.save()
    return [cardOne, cardTwo]
}
const createHouse = (blackjack) => {
    const house = {}
    const hand = getNewHand(blackjack)
    let points = (this.hand[0] % 13) + 1 > 10 ? 10 : (this.hand[0] % 13) + 1 
    points += (this.hand[1] % 13) + 1 > 10 ? 10 : (this.hand[1] % 13) + 1 
    house.hand = hand
    house.points = points
    return house
}
const getPlayer = (blackjack, name) => {
    let index = 0
    blackjack.players.forEach(player => {
        if (player.name === name) {
            return { index, player }
        }
        index++
    });
    return { index: -1, player: null }
}
const genCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let result
    do {
        result = ''
        for ( var i = 0; i < 5; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    } while (BlackJack.exists({ _id: result }))
    return result;
}
exports.test = (req, res) => {
    console.log('Route test called.');
    try {
        res.end(JSON.stringify('Routes are working.'))
    } catch (err) {
        res.status(409).json({ error: err })
    }
}
exports.postCreateGame = async (req, res) => {
    const { body: { name } } = req
    try {
        const code = genCode()
        const blackjack = new BlackJack({ _id: code })
        const player = new Player(getNewHand(blackjack), name)
        const house = createHouse(blackjack)
        blackjack.house = house
        await blackjack.save()
        res.status(200).json({ code: blackjack.code, player })
    } catch (err) {
        res.status(409).json({ error: err })
    }
}
exports.putAddPlayer = async (req, res) => {
    const { body: { code, name } } = req
    try {
        const blackjack = await BlackJack.findOne({ _id: code });
        blackjack.players.forEach(oldPlayer => {
            if (oldPlayer.name === name) {
                throw Error('Player exists')
            }
        });
        const player = new Player(getNewHand(blackjack), name)
        blackjack.players.push(player)
        await blackjack.save()
        res.status(200).json({ code: blackjack.code, player })
    } catch (err) {
        res.status(409).json({ error: err })
    }
}
exports.putGetCard = async (req, res) => {
    const { body: { code, name } } = req
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
        blackjack.cards.splice(cardIndex, 1)
        player.hand.push(card)
        player.points += (card % 13) + 1 > 10 ? 10 : (card % 13) + 1 
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