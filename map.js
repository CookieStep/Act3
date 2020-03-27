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
`bb
bbb
bbbb
bbbb
bbbb
bbbb
bbbbP
bbbb
bbbb
bbbbb
bbbbb
bbbbb
bbbbbb
bbbbbb
bbbbbb
bbbbbb
bbbbb
bbbbb
bbbbb
bbbb
bbbb
bbbb
bbbbb
bbbbb
bbbbb
bbbbbb
bbbbbb
bbbbbb
bbbbbbb
bbbbbbb
bbbbbbb
bbbbbbb
bbbbbbb
bbbbbbb
bbbbbb
bbbbbb
bbbbbb
bbbbbbb
bbbbbbb
bbbbbbb
bbbbbbb
bbbbbbb
bbbbbbb
bbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbb
bbbbbb
bbbbbb
bbbbb
bbbbb
bbbbb
bbbbb
bbbbb
bbbbb
bbbbb
bbbbb
bbbbb
bbbbbb
bbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbb
bbbbbbb
bbbbbbb
bbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbbb
bbbbbbbbbbbb
bbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbb
bbbbbbbbbbb
bbbbbbbbbb
bbbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbbb
bbbbbbbbb
bbbbbbbbbb
bbbbbbbbbbb
bbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbb
bbbbbbbbbbbbb
bbbbbbbbbbbb
bbbbbbbbbbb
bbbbbbbbbb
bbbbbbbbb
bbbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbb
bbbbbbb
bbbbbb
bbbbbb
bbbbb
bbbbb
bbbbb
bbbbb
bbbbb
bbbbbb
bbbbbb
bbbbbb
bbbbbb
bbbbbb
bbbbbbb`

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