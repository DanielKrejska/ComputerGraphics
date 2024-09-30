"use strict";

var gl;
var program;
var t = 0.0;
var morphing = false;
var intervalId;
var direction = 1;

var buffer1, buffer2;

init();

function init() {
    var canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext('webgl2');
    if (!gl) {
        alert("WebGL isn't available");
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var shapeL = [
        vec2(-0.5, 0.5),
        vec2(-0.3, 0.5),
        vec2(-0.3, -0.3),
        vec2(0.1, -0.3),
        vec2(0.1, -0.5),
        vec2(-0.5, -0.5)
    ];

    var shapeV = [
        vec2(-0.5, 0.5),
        vec2(-0.3, 0.5),
        vec2(0.0, -0.2),
        vec2(0.3, 0.5),
        vec2(0.5, 0.5),
        vec2(0.0, -0.5)
    ];

    buffer1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(shapeL), gl.STATIC_DRAW);

    buffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(shapeV), gl.STATIC_DRAW);

    document.getElementById('toggle').addEventListener("click", function () {
        if (morphing) {
            clearInterval(intervalId);
        } else {
            intervalId = setInterval(() => {
                t += direction * 0.015;
                if (t >= 1.0 || t <= 0.0) {
                    direction *= -1;
                }
                render();
            }, 100);
        }
        morphing = !morphing;
    });

    render();
}

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT);

    var morphLoc = gl.getUniformLocation(program, "uMorph");
    gl.uniform1f(morphLoc, t);

    var color = vec4(1.0 * t, 0.0, 1.0 * (1.0 - t), 1.0);
    var colorLoc = gl.getUniformLocation(program, "uColor");
    gl.uniform4fv(colorLoc, flatten(color));

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer1);
    var positionLoc1 = gl.getAttribLocation(program, "aPosition1");
    gl.vertexAttribPointer(positionLoc1, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc1);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer2);
    var positionLoc2 = gl.getAttribLocation(program, "aPosition2");
    gl.vertexAttribPointer(positionLoc2, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc2);

    gl.drawArrays(gl.LINE_LOOP, 0, 6);
    gl.drawArrays(gl.LINE_LOOP, 0, 6);
}
