function start() {
    draw.attach("canvas")
    draw.fillScreen()
    requestAnimationFrame(update)
}
let scale = 50

function drw(x, y, color, bgColor) {
    draw.box(x, y, 1, 1, { flip: true, color: color })
    draw.box(x + 0.1, y + 0.1, 0.8, 0.8, { flip: true, color: bgColor })
}

function selected(x = 0, y = 0) {
    switch (y) {
        case 0:
            game.selected == "a" ? drw(x, y, "black", "lime") : drw(x, y, "black", "darkgreen")
            break;
        case 1:
            game.selected == "p" ? drw(x, y, "black", "aqua ") : drw(x, y, "black", "darkblue")
            break;
        case 2:
            game.selected == "w" ? drw(x, y, "black", "chocolate") : drw(x, y, "black", "saddlebrown")
            break;
    }
}

function update() {
    //Clear the screen
    draw.clear()
        //Draw the grid
    for (let x = 0; x < game.floor.length + 1; x++) {
        for (let y = 0; y < draw.height / scale; y++) {
            if (x == 0) {
                selected(x, y)
                continue;
            }
            draw.box(x, y, 1, 1, { flip: true, color: "black" })
            draw.box(x + 0.1, y + 0.1, 0.8, 0.8, { flip: true, color: "white" })
        }
    }
    //
    {
        let player = game.player
        draw.box(player.x - screen.left + 1, player.y, 1, 1, { color: "blue", flip: true })
    }
    //Ground
    for (let x = Math.floor(screen.left + 1) - 1; x < screen.right; x++) {
        let level = game.floor[x]
        let low = level
        if (game.floor[x - 1] < low)
            low = game.floor[x - 1]
        if (game.floor[x + 1] < low)
            low = game.floor[x + 1]
        low--
        for (let y = 0; y < level; y++) {
            draw.box(x - screen.left + 1, y, 1, 1, { color: y + 1 <= low ? draw.hsl(20 + 20 * rand(x, y), 100, 75) : draw.hsl(80 + 60 * rand(x, y)), flip: true })
        }
    }
    //Tiles
    for (let tile of game.tile) {
        draw.box(tile.x - screen.left + 1, tile.y, 1, 1, { flip: true, color: tile.color })
    }

    if (game.left) {
        mouseClick(game.mouse, false)
    }

    requestAnimationFrame(update)
}
let game = {
    floor: [1],
    tile: [],
    player: { x: -1, y: -1 },
    selected: "a",
    hold : false,
    left : 0
}
let screen = {
    left: 0,
    get right() { return this.left + this.width },
    get width() { return draw.width / scale },
    get height() { return draw.height / scale }
}
function keyPress(e) {
    switch(e.key) {
        case "Shift" :
            game.hold = true
        break;
        case "ArrowRight":
            screen.left++
        break;
        case "ArrowLeft":
            screen.left--
        break;
        default:
            game.selected = e.key
    }
}
function keyUp(e) {
    switch(e.key) {
        case "Shift" :
            game.hold = false
        break;
    }
}
function mouseClick(e) {
    let x = Math.floor(e.x / scale) - 1 + screen.left
    let y = Math.floor((draw.height - e.y) / scale)
    if(x >= 0) {
        if(game.selected == "a") {
            if(game.player.x == x)
                game.player.y += y - game.floor[x] + 1
            for (let tile of game.tile) {
                if(tile.x == x)
                    tile.y += y - game.floor[x] + 1
            }
            game.floor[x] = y + 1
        }else{
            let found = false
            if(game.player.x == x && game.player.y == y) {
                game.player = {x : -1, y : -1}
                found = "p" == game.selected
            }
            game.tile = game.tile.filter((value) => {
                if((value.x == x && value.y == y) && value.type == game.selected) {found = true}
                return value.x != x || value.y != y
            })
            if(!found) {
                switch(game.selected) {
                    case "p" :
                        game.player = {x, y}
                    break;
                    default :
                        game.tile.push({x, y, type : game.selected})
                    break;
                }
            }
        }
    }else{

    }
}
let v = 1
function rand(s, s2) {
    let x = Math.cos(s) * Math.sin(s2) * v
    return x - Math.floor(x)
}
function rightClick(e) {
    if (event.preventDefault != undefined)
        event.preventDefault();
    if (event.stopPropagation != undefined)
        event.stopPropagation();
}
addEventListener("keydown", keyPress)
addEventListener("keyup", keyUp)
addEventListener("load", start)
addEventListener("mousedown", mouseClick)
addEventListener("mousemove", function(e) {if(game.hold) mouseClick(e)})
addEventListener("contextmenu", rightClick)