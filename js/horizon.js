/*Global Variables*/

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = 300;

var mouseX, mouseY, temp, timer, count;

var amplitude = 40;
var offsetTop = 100;
var fA = 1;
var noiseConstant = 0;
var y = amplitude + offsetTop;
var x = 0;
ctx.lineWidth = 4;
var growSpeed = 0.08;
var color = {white: "#212121", black: "#FFFFFF", red: "#F5F5F5", green: "#9E9E9E", blue: "#ffffff"};
var noise = [];
var noisePointer = 0;

(function () {
    for (var j = 0; j < 3; j++) {
        noise[j] = [];
        for (var i = 0; i < window.innerWidth; i++)
            noise[j][i] = noiseGen(4);
    }

    render();
})();

/*Library*/
function f(x, xs, xf) {
    temp = Math.abs(amplitude * -fD(x, xs, xf) * fC(x, xs, xf));
    return (x >= xs && x <= xf && temp != 0) ? temp + noise[noisePointer][x] : noise[noisePointer][x];
}

function fC(x, xs, xf) {
    return Math.sin(((Math.PI * (x - xs)) / (xf - xs)));
}

function fD(x, xs, xf) {
    return fA * Math.cos(((2 * Math.PI * (x - xs)) / (xf - xs)));
}

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function noiseGen(max) {
    if (noiseConstant >= max)
        return noiseConstant -= 2;
    else if (noiseConstant <= 0)
        return noiseConstant += 2;
    return noiseConstant += rand(-1, 1);
}

/*Draw*/
function draw(xs, xf, colorFill, colorLine, dist) {
    for (x = 0; x < canvas.width; x++) {
        drawCurve(xs, xf, colorLine);
        drawFill(x, y, colorFill);
    }
    offsetTop += dist;
    amplitude += 5;
    noisePointer = (noisePointer == noise.length - 1) ? 0 : noisePointer + 1;
}

function drawCurve(xs, xf, color) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    y = amplitude + offsetTop - f(x, xs, xf);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
}

function drawFill(x, y, color) {
    ctx.strokeStyle = (x % 4 == 0) ? color : this.color.white;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
    ctx.closePath();
}

/*Events*/
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    offsetTop = 100;
    amplitude = 50;

    draw(200, 600, color.white, color.blue, 5);
    draw(300, 600, color.blue, color.blue, 10);
    draw(0, 0, color.white, color.blue, 5);
    draw(200, 500, color.green, color.green, 5);
    draw(200, 600, color.white, color.green, 15);
    draw(900, 1200, color.green, color.green, 5);
    draw(600, 900, color.white, color.red, 2);
    draw(900, 1250, color.white, color.red, 2);
    draw(500, 900, color.red, color.red, 10);
    draw(700, 1000, color.white, color.red, 6);
    draw(0, 0, color.white, color.red, 6);
}

function toggleFA() {
    count = 0;
    timer = setInterval(function () {
        fA += growSpeed;
        count++;
        if (fA >= 1 || fA <= 0) {
            fA = (fA >= 1) ? 1 : 0;
            clearInterval(timer);
            growSpeed *= -1;
        }
    }, 10);
}

canvas.onmousemove = function (e) {
    mouseX = e.layerX;
    mouseY = e.layerY;
};