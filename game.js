function update() {
    draw.clear()
    {
        let player = game.player
        player.update()
        draw.box(player.x - screen.left, player.y, 1, 1, {color : "blue", flip : true})
    }
    for (let x = Math.floor(screen.left); x < screen.right; x++) {
        let level = game.floor[x]
        let low = level
        if(game.floor[x - 1] < low)
            low = game.floor[x - 1]
        if(game.floor[x + 1] < low)
            low = game.floor[x + 1]
        low--
        for(let y = 0; y < level; y++) {
            draw.box(x - screen.left, y, 1, 1, {color : y + 1 <= low ? "brown" : "green", flip : true})
        }
    }
    for(let wall of game.wall) {
        draw.box(wall.x - screen.left, wall.y, 1, 1, {flip : true, color : "tan"})
    }
}
let game = {
    floor: [1],
    player: {},
    wall : [],
    inGround(object, a=false) {
        return a ? game.floor[Math.floor(object.x)] >= Math.ceil(object.y) || game.floor[Math.ceil(object.x)] >= Math.ceil(object.y) : game.floor[Math.floor(object.x)] > Math.floor(object.y) || game.floor[Math.ceil(object.x)] > Math.floor(object.y)
    },
    clearMap() {
        this.wall = [];
        this.floor = []
    },
    move(object) {
        object.velocity.x = Math.fix(object.velocity.x, -1)
        object.velocity.y = Math.fix(object.velocity.y, -1)
        let old = {
            x : object.x,
            y : object.y
        }
        let x = false
        object.x += object.velocity.x
        if(object.x + 1 > game.floor.length)
            object.x = game.floor.length - 1
        if(object.x < 0)
            object.x = 0
        if(game.inGround(object))
            x = true
        object.y += object.velocity.y
        if(x) {
            if(game.inGround(object)) {
                if(object.velocity.x > 0)
                    object.x = Math.ceil(old.x)
                else
                    object.x = Math.floor(old.x)
                object.velocity.x = 0
                if(game.inGround(object)) {
                    let test = game.floor[Math.floor(object.x)] > Math.floor(object.y)
                    if(test || game.floor[Math.ceil(object.x)] > Math.floor(object.y)) {
                        object.velocity.y = 0
                        if(test)
                            object.y = game.floor[Math.floor(object.x)]
                        if(game.floor[Math.ceil(object.x)] > Math.floor(object.y))
                            object.y = game.floor[Math.ceil(object.x)]
                    }
                }
            }
        }else{
            let test = game.floor[Math.floor(object.x)] > Math.floor(object.y)
            if(test || game.floor[Math.ceil(object.x)] > Math.floor(object.y)) {
                object.velocity.y = 0
                if(test)
                    object.y = game.floor[Math.floor(object.x)]
                if(game.floor[Math.ceil(object.x)] > Math.floor(object.y))
                    object.y = game.floor[Math.ceil(object.x)]
            }
        }
    }
}
let screen = {
        left: 0,
        get right() { return this.left + this.width },
        set right(value) {this.left = value - this.width},
        bottom: 0,
        get width() { return draw.width / (scale ? scale : 1) },
        get height() { return draw.height / (scale ? scale : 1) }
}
// draw.box(x, y, width, height, {color : string, flip : boolean})
// draw.text("text", x, y, {color : string, flip : boolean, size : number})