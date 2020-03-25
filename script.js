let canvas = document.createElement("canvas");
let pen = canvas.getContext("2d");
let request;
Math.angle = radian => radian / Math.PI * 180;
Math.radian = angle => angle * Math.PI / 180;
function loop() {
    request = requestAnimationFrame(loop)
};
function start() {
    document.body.appendChild(canvas);
    fitScreen();
    requestAnimationFrame(loop)
};
function fitScreen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight
};
addEventListener("load", start)