/**
 * Player constructor
 * 
*/
function player(x, y, powerup) {
    Object.defineProperties(this, {
        // Variables
        x : {get() {return x}, set(value) {x = value}},
        y : {get() {return y}, set(value) {y = value}},
        powerup : {get() {return powerup}, set(value) {powerup = value}}
    })
};