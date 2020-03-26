//Drawing on the canvas
let draw = {
    //Setup
    width : 0,
    height : 0,
    hsl(hue=0, saturation=100, light=100, alpha=1) {
        let color = {red : 0, green : 0, blue : 0}
        let colors = ["red", "green", "blue"]
        /*Hue*/ {
            let _hue = Math.loop(hue, 360),
                num = _hue % 60 / 60 * 255,
                a = Math.floor(_hue / 60),
                b = a % 2,
                col = (a - b) / 2
            if(b) {
                color[colors[col]] = 255 - num
                color[colors[(col + 1) % 3]] = 255
            }else{
                color[colors[col]] = 255
                color[colors[(col + 1) % 3]] = num
            }
        }
        /*Saturation and Brightness*/ {
            let _saturation = 1 - saturation / 100
            let _light = light / 100
            for(let col of colors) {
                color[col] = Math.fix((((255 - color[col]) * _saturation) + color[col]) * _light, 0, 255)
            }
        }
        return `rgba(${color.red}, ${color.green}, ${color.blue}, ${alpha})`
    },
    //Scale the screen
    scale : (num=0, up=true) => (num * (scale ? scale : 1) + (up ? 0.2 : 0)),
    //Attach draw to the canvas
    attach(id) {
        let element = document.getElementById(id)
        if(element == null) {
            element = document.createElement("canvas");
            element.id = id;
            document.body.appendChild(element)
        }
        draw.element = element
        if(draw.fill) {
            draw.fillScreen();
            delete draw.fill
        }else{
            draw.width = draw.element.width;
            draw.height = draw.element.width
        }
        draw.pen = draw.element.getContext("2d")
    },
    //Fill the screen
    fillScreen() {
        if(!draw.check.attached(false)) {
            draw.element.width = window.innerWidth
            draw.element.height = window.innerHeight
            draw.width = draw.element.width
            draw.height = draw.element.height
        }else
            draw.fill = true
    },
    //Errors
    error : {
        unattached : new Error("Draw isn't attached to anything yet")
    },
    //Check for errors, hard checks will throw the error, soft checks will return true or false
    check : {
        attached(hard=false) {
            if(hard) {
                if(draw.element == undefined)
                    throw draw.error.unattached
            }else{
                return draw.element == undefined
            }
        }
    },
    //Draw a box
    box(x=0, y=0, width=0, height=0, props=DRAW_PROPS) {
        draw.check.attached(true);
        draw.penSetup(props);
        let _y = draw.scale(y);
        let _height = draw.scale(height, _y != Math.floor(_y));
        if(props.flip)
            _y = draw.height - (_y + _height);
        draw.pen.fillRect(draw.scale(x), _y, draw.scale(width, draw.scale(x) != Math.floor(draw.scale(x))), _height)
    },
    //Draw a circle / Semicircle
    circle(x=0, y=0, radius=0, props=DRAW_PROPS) {
        draw.check.attached(true);
        let {startAngle=0, endAngle=360, flip=false} = props;
        draw.penSetup(props);
        let _y = draw.scale(y);
        if(flip)
            _y = this.height - _y;
        draw.pen.beginPath();
        draw.pen.moveTo(draw.scale(x), _y);
        draw.pen.arc(draw.scale(x), _y, draw.scale(radius, _y != Math.floor(_y) || draw.scale(x) != Math.floor(draw.scale(x))), (startAngle - 90) / 180 * Math.PI, (endAngle - 90) / 180 * Math.PI);
        draw.pen.fill()
    },
    //Draw a line
    line(x, y, x2, y2, props=DRAW_PROPS) {
        let _y = draw.scale(y);
        let _y2 = draw.scale(y2);
        if(props.flip) {
            _y = this.height - _y;
            _y2 = this.height - _y2
        };
        draw.penSetup(props);
        draw.pen.beginPath();
        draw.pen.moveTo(draw.scale(x), _y);
        draw.pen.lineTo(draw.scale(x2), _y2);
        draw.pen.stroke()
    },
    text(text, x, y, props=DRAW_PROPS) {
        let _y = draw.scale(y);
        props.size = draw.scale(props.size, _y != Math.floor(_y));
        if(props.flip) {
            _y = this.height - (_y + props.size)
        };
        draw.penSetup(props);
        draw.pen.fillText(text, draw.scale(x), _y + props.size)
    },
    //Erase everything
    clear() {
        draw.pen.clearRect(0, 0, draw.width, draw.height)
    },
    //Setup reused values
    penSetup(props=DRAW_PROPS) {
        draw.check.attached(true);
        let {color=DRAW_PROPS.color, size=DRAW_PROPS.size} = props;
        draw.pen.fillStyle = color;
        draw.pen.font = `${size}px Arial`
    }
};
const DRAW_PROPS = {
    color : "#000000",
    flip : false,
    size : 10
}
// draw.attach("canvas")
// draw.box(0, 0, 10, 10, {color : "blue", flip : true})
// draw.circle(0, 0, 10, {color : "red", flip : true, startAngle : 0, endAngle : 360})
Math.loop = (num, max) => (num % max + max) % max
Math.fix = function(number, min=0, max=1) {
    let _num = number
    if(_num < min)
        _num = min
    if(_num > max)
        _num = max
    return _num
}