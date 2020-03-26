/**
 * enemy constructor
 * @param x The x position the enemy spawns with
 * @param y The y position the enemy spawns with
 * @param powerup The powerup id that the enemy spawns with
*/
function Enemy(x=0, y=0, powerup=0) {
    /**The enemy's x coordinate*/
    this.x = x
    /**The enemy's y coordinate*/
    this.y = y
    /**The enemy's x powerup id*/
    this.powerup = powerup
    Object.defineProperties(this, {
        x : {get() {return x}, set(value) {x = value}},
        y : {get() {return y}, set(value) {y = value}},
        powerup : {get() {return powerup}, set(value) {powerup = value}}
    })
};