module.exports = class Player {
    constructor(hand, name) {
        this.hand = hand
        this.name = name
        this.lose = false
        this.win = false
        this.ready = false
        this.wins = 0
        this.loses = 0
        this.points = (this.hand[0] % 13) + 1 > 10 ? 10 : (this.hand[0] % 13) + 1 
        this.points += (this.hand[1] % 13) + 1 > 10 ? 10 : (this.hand[1] % 13) + 1 
    }
}