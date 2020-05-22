const Player = require('../models/blackjack-player-model')
const BlackJack = require('../models/blackjack-model')
const updateGame = (blackjack) => {
    //PROXY FUNCTION TO CALL AFTER EVERY UPDATE
}
const getBestScore = (hand) => {
    const points = [0]
    hand.forEach(card => {
        const value = (this.hand[0] % 13) + 1 > 10 ? 10 : (this.hand[0] % 13) + 1
        if (value === 1) {
            points.push(...points)
            let index = 0
            points.forEach(point => {
                if (index < points.length/2) {
                    points[index] += 1
                } else {
                    points[index] += 11
                }
                index ++
            })
            points.filter(point => point <= 21)
        } else {
            let index = 0
            points.forEach(point => {
                points[index] += value
                index ++
            })
            points.filter(point => point <= 21)
        }
    })
    return Math.max(...points)
}
const calculateScores = async (blackjack) => {
    blackjack.state = 'SCORES'
    if (blackjack.hand.lose) {
        players.forEach(player => {
            if (!player.lose) {
                player.win = true
                player.wins += 1
            }
        })
    } else if (blackjack.hand.win) {
        players.forEach(player => {
            if (!player.lose) {
                player.lose = true
                player.loses += 1
            }
        })
    } else {
        const houseGame = getBestScore(blackjack.house.hand)
        players.forEach(player => {
            if (!player.lose) {
                const playerGame = getBestScore(player.hand)
                if (playerGame > houseGame) {
                    player.win = true
                    player.wins += 1
                } else {
                    player.lose = true
                    player.loses += 1
                }
            }
        })
    }
    await blackjack.save()
    updateGame(blackjack)
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
const createHouse = async (blackjack) => {
    const house = {}
    const hand = await getNewHand(blackjack)
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
const genCode = async () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let result
    do {
        result = ''
        for ( var i = 0; i < 5; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    } while (await BlackJack.exists({ _id: result }))
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
        const code = await genCode()
        const blackjack = new BlackJack({ _id: code })
        const player = new Player(await getNewHand(blackjack), name)
        blackjack.players.push(player)
        const house = await createHouse(blackjack)
        blackjack.house = house
        await blackjack.save()
        updateGame(blackjack)
        res.status(200).json({ code: blackjack.code, players: blackjack.players, house: blackjack.house })
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
        const player = new Player(await getNewHand(blackjack), name)
        blackjack.players.push(player)
        await blackjack.save()
        updateGame(blackjack)
        res.status(200).json({ code: blackjack.code, players: blackjack.players, house: blackjack.house })
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
        updateGame(blackjack)
        res.status(200).send({ code: blackjack.code, players: blackjack.players, house: blackjack.house })
    } catch (err) {
        res.status(409).json({ error: err })
    }
}