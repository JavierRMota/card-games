const Player = require('../models/blackjack-player-model')
const BlackJack = require('../models/blackjack-model')
const SOCKET =  require('../controllers/socket-controller')
const updateGame = (blackjack) => {
    SOCKET.update(blackjack);
}
const makeHousePlay = async (blackjack) => {
    while (blackjack.house.points < 16) {
        const cardIndex = Math.floor(Math.random() * blackjack.cards.length);
        const card = blackjack.cards[cardIndex];
        blackjack.cards.splice(cardIndex, 1);
        blackjack.house.hand.push(card);
        blackjack.house.points = getBestScore(blackjack.house.hand);
        updateGame(blackjack);
        await blackjack.save();
    }
    await calculateScores(blackjack);
}
const getBestScore = (hand) => {
    const points = [0]
    let fileterdPoints = []
    hand.forEach(card => {
        const value = (card % 13) + 1 > 10 ? 10 : (card % 13) + 1
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
        } else {
            let index = 0
            points.forEach(point => {
                points[index] += value
                index ++
            })
        }
    })
    fileterdPoints = points.filter(point => point <= 21)
    return fileterdPoints.length > 0 ? Math.max(...fileterdPoints) : Math.min(...points)
}
const calculateScores = async (blackjack) => {
    blackjack.state = 'SCORES'
    const players = blackjack.players
    if (blackjack.house.lose) {
        players.forEach(player => {
            if (!player.lose) {
                player.win = true
                player.wins += 1
            }
        })
    } else if (blackjack.house.win) {
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
    blackjack.players = players;
    updateGame(blackjack);
    await blackjack.save();
}

const checkAllReady = async (blackjack) =>  {
    let allready = true
    blackjack.players.forEach(player => {
        allready = allready & player.ready
    });
    return allready;
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
    house.hand = hand
    house.points = getBestScore(hand)
    return house
}
const getPlayer = (blackjack, id) => {
    for (let i = 0; i < blackjack.players.length; i++) {
        const player = blackjack.players[i]
        if (player._id.toString() === id) {
            return { index: i, player }
        }
    }
    return { index: -1, player: null }
}
/** Generates a random code Example. 'B8A6S' */
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
/** Test if module is working correctly. */
exports.test = (req, res) => {
    console.log('Route test called.');
    try {
        res.end(JSON.stringify('Routes are working.'))
    } catch (err) {
        console.log(err)
        res.status(409).json({ error: err.message })
    }
}
/** Creates a game using a player name and a deck. */
exports.postCreateGame = async (req, res) => {
    const { body: { name, decks } } = req
    try {
        const code = await genCode()
        const blackjack = new BlackJack({ _id: code })
        if (decks && decks != 1) {
            blackjack.decks = decks
            blackjack.cards =  Array(52 * decks).fill().map((_, idx) => idx % 53)
        }
        let player = new Player(await getNewHand(blackjack), name)
        blackjack.players.push(player)
        const house = await createHouse(blackjack)
        blackjack.house = house
        await blackjack.save()
        player = blackjack.players[blackjack.players.length - 1]
        updateGame(blackjack)
        res.status(200).json({ code: blackjack._id, player, players: blackjack.players, house: blackjack.house })
    } catch (err) {
        console.log(err)
        res.status(409).json({ error: err.message })
    }
}
/** Adds a player to a game by receiving GameCode and Name of Player*/
exports.putAddPlayer = async (req, res) => {
    const { body: { code, name } } = req
    try {
        const blackjack = await BlackJack.findById(code);
        blackjack.players.forEach(oldPlayer => {
            if (oldPlayer.name === name) {
                throw Error('Player exists')
            }
        });
        let player = new Player(await getNewHand(blackjack), name)
        blackjack.players.push(player)
        await blackjack.save()
        player = blackjack.players[blackjack.players.length - 1]
        updateGame(blackjack)
        res.status(200).json({ code: blackjack._id, player, players: blackjack.players, house: blackjack.house })
    } catch (err) {
        console.log(err)
        res.status(409).json({ error: err.message })
    }
}
/** Gives a player a card from the cards in the current game and updates his points.*/
exports.putGetCard = async (req, res) => {
    const { body: { code, id } } = req
    try {
        const blackjack = await BlackJack.findById(code);
        const { index, player } = getPlayer(blackjack, id)
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
        player.points = getBestScore(player.hand)
        if (player.points > 21) {
            player.lose = true
            player.ready = true
        } else if (player.hand.length > 4) {
            player.win = true
            player.ready = true
        }
        blackjack.players[index] = player
        await blackjack.save()
        updateGame(blackjack)
        res.status(200).json({ code: blackjack._id, players: blackjack.players, house: blackjack.house })
    } catch (err) {
        console.log(err)
        res.status(409).json({ error: err.stack })
    }
}
//** Sets a player status as ready by receiving his Gamecode and name */
exports.putPlayerReady = async (req, res) => {
    const { body: {code, id} } = req
    try {
        const blackjack = await BlackJack.findById(code);
        const { index, player } = getPlayer(blackjack, id)
        if (index === -1) {
            throw Error('Player does not exists')
        }
        player.ready = true
        await blackjack.save()
        if(checkAllReady(blackjack)){
           await makeHousePlay(blackjack)
        }
        res.status(200).json({ code: blackjack._id, players: blackjack.players, house: blackjack.house })
        
    } catch (err) {
        console.log(err)
        res.status(409).json({ error: err.message })
    }
}

// TODO: Implement routes
exports.deletePlayer = async (req,res) => {
    try {
        const blackjack = await BlackJack.findById(code);
        const { index } = getPlayer(blackjack, id)
        if (index === -1) {
            throw Error('Player does not exists')
        }
        blackjack.players.splice(index,1);
        if (blackjack.players.length === 0) {
            Socket.finish(blackjack);
            await blackjack.remove();
        } else {
            Socket.remove(code, id);
            await blackjack.save();
            updateGame(blackjack);
        }
        res.status(200).json({ code: blackjack._id, players: blackjack.players, house: blackjack.house })
        
    } catch (err) {
        console.log(err)
        res.status(409).json({ error: err.message })
    }
}