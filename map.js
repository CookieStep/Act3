var map1 =
    `
                -                               
              -   -                             
             -     -                            
            +++++++++                           
            +       +                           
            +       +                           
    P       +       +                           
################################################
################################################
`;
/*
# == ground
* == player
+ == enemy
*/
map0 =
`bP
b
bbb
bbwwwwwwwwwwwwwww
bbw             w
bbw             w
bbw             w
bbbwwwwwwwwwwwwww
bbb
bbbb
bbbb
bb
bbb
bbb
bbb
bbbbb
bbb
bbbb
bbbb
bbb
bb
bbb
bbb
bbbb
bbbb
b
b
b
b
bbb
b
bb
bb
bbb
bbb
bbbbb
bbbb
bbb
b
b
b
b
bbb
bbbbb
bbbb
bbbb
bbbbb
bbbb
bb
bb
bbb
bb
bb
bbb
bbb
bb
bb
bb
b`;

map1.split(`\n`)
    /*
    let key = {
        "P" : player,
        "#" : ground,
        "|" : walls,
    }
    ############
    */
function loadMap(map = map0) {
    map = map.split("\n")
    game.clearMap()
    for (let x = 0; x < map.length; x++) {
        let level = map[x];
        game.floor.push(0)
        for (let y = 0; y < level.length; y++) {
            switch (level[y]) {
                case "P":
                    new Player(x, y);
                break;
                case "b":
                    ++game.floor[x];
                break;
                case "w":
                    new Wall(x, y);
                break;
            }
        }
    }
}