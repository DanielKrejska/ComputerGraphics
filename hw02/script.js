"use strict";
var gl;
var points = [];
var sliderVal = 0;
init();

function init()
{
    var canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) { alert("WebGL isn't available"); }

    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    

    // Get location of shader variables
    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    // add event listener to the slider
    document.getElementById('slider').addEventListener("input", function () {
        sliderVal = this.value;
        points = [];
        setPointsAndRender();
    });

    setPointsAndRender();
}

function setPointsAndRender()
{
    recursiveSubdivision(vec2(-0.95, 0), vec2(0.95, 0), sliderVal);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
    render();
}

function recursiveSubdivision(a, b, depth)
{
    if (depth === 0)
    {
        points.push(a, b);
        return;
    }

    var len = subtract(b, a);
    var third = scale(1 / 3, len);

    var p1 = add(a, third);
    var p2 = add(a, scale(2 / 3, len));

    var mid = add(p1, scale(0.5, subtract(p2, p1)));
    var perp = vec2(-third[1], third[0]);
    var peak = add(mid, scale(Math.sqrt(3) / 2, perp));

    recursiveSubdivision(a, p1, depth - 1);
    points.push(peak);
    recursiveSubdivision(p2, b, depth - 1);
}

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.LINE_STRIP, 0, points.length);
}
