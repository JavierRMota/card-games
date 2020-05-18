module.exports = class Player {
    constructor (hand,name) {
        this.hand = hand
        this.name = name
        this.lose = false
        this.win = false
        this.points = this.hand[0] % 13
    }
}