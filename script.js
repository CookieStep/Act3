let request;
Math.angle = radian => radian / Math.PI * 180;
Math.radian = angle => angle * Math.PI / 180;
Math.fix = function(number, min=0, max=1) {
    let _num = number
    if(_num < min)
        _num = min
    if(_num > max)
        _num = max
    return _num
}
function loop() {
    update();
    request = requestAnimationFrame(loop)
};
let scale = 25
function start() {
    draw.attach("canvas");
    draw.fillScreen();
    loadMap(map0);
    requestAnimationFrame(loop)
};

var keymap = {
    a: false,
    s: false,
    d: false,
    w: false,
}
function keydown(e) {
    if (keymap.hasOwnProperty(e.key) && !keymap[e.key])
        keymap[e.key] = true;
}
function keyup(e) {
    if (keymap.hasOwnProperty(e.key) && keymap[e.key])
        keymap[e.key] = false;
}
addEventListener("load", start);
addEventListener("keydown", keydown)
addEventListener("keyup", keyup)