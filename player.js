/**
 * Player constructor
 * @param x The x position the player spawns with
 * @param y The y position the player spawns with
 * @param powerup The powerup id that the player spawns with
 */
function Player(x = 0, y = 0, powerup = 0) {
    let velocity = { x: 0, y: 0 }
        /**The player's x coordinate*/
    this.x = x
        /**The player's y coordinate*/
    this.y = y
        /**The player's x powerup id*/
    this.powerup = powerup
        /**The player's velocity*/
    this.velocity = {}
        /**The gravity that affects the player */
    this.gravity = 0.05
    Object.defineProperties(this, {
        x: {get() { return x }, set(value) { x = value } },
        y: {get() { return y }, set(value) { y = value } },
        powerup: {get() { return powerup }, set(value) { powerup = value } }
    })
    Object.defineProperties(this.velocity, {
        x: {get() { return velocity.x }, set(value) { velocity.x = value } },
        y: {get() { return velocity.y }, set(value) { velocity.y = value } },
    })
    this.jump = function() {
        this.velocity.y = 0.5
    }

    this.colliding = function() {
        return game.inGround(this, true)
    }

    this.inGround = function() {
        return game.inGround(this, true)
    }

    this.update = function() {
        if (keymap.w) {
            if (this.canJump)
                this.jump();
        }
        if(this.inGround())
            velocity.x *= 0.95
        if (keymap.d && this.velocity.x < 0.5)
            velocity.x += 0.005
        if (keymap.a && this.velocity.x > -0.5)
            velocity.x -= 0.005
        velocity.y -= this.gravity
        this.canJump = this.inGround()
        game.move(this)
        screen.left = x + 1/2 - screen.width / 2
        if(screen.left < 0)
            screen.left = 0
        if(screen.right > game.floor.length)
            screen.right = game.floor.length
    }
    game.player = this
};