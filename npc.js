/**
 * Npc constructor
 * @param x The x position the npc spawns with
 * @param y The y position the npc spawns with
*/
function Npc(x=0, y=0) {
    /**The npc's x coordinate*/
    this.x = x
    /**The npc's y coordinate*/
    this.y = y
    Object.defineProperties(this, {
        x : {get() {return x}, set(value) {x = value}},
        y : {get() {return y}, set(value) {y = value}},
    })
};