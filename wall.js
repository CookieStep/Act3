/**
 * Wall constructor
 * @param x The x position the wall spawns with
 * @param y The y position the wall spawns with
*/
function Wall(x=0, y=0) {
    /**The wall's x coordinate*/
    this.x = x
    /**The wall's y coordinate*/
    this.y = y
    Object.defineProperties(this, {
        x : {get() {return x}, set(value) {x = value}},
        y : {get() {return y}, set(value) {y = value}},
    })
    game.wall.push(this)
};

function Ground(x=0, y=0) {
    /**The Ground's x coordinate*/
    this.x = x
    /**The Ground's y coordinate*/
    this.y = y
    Object.defineProperties(this, {
        x : {get() {return x}, set(value) {x = value}},
        y : {get() {return y}, set(value) {y = value}},
    })
};