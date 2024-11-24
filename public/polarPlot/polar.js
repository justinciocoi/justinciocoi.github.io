//GLOBAL VARS
const canvas = document.getElementById('tanPolarCanvas');
const ctx = canvas.getContext('2d');

const sinCanvas = document.getElementById('sinPolarCanvas');
const cosCanvas = document.getElementById('cosPolarCanvas');

const sinctx = sinCanvas.getContext('2d');
const cosctx = cosCanvas.getContext('2d');

const customCanvas = document.getElementById('customCanvas');
const customctx = customCanvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;

let expr = document.getElementById('customInput').value;
let isPlaying = false;
const slider = document.getElementById('intControl');
let interval;


//FUNCTIONS


// Convert polar coordinates (r, theta) to Cartesian (x, y)
function polarToCartesian(centerX, centerY, r, theta) {
    return {
        x: centerX + r * Math.cos(theta),
        y: centerY - r * Math.sin(theta)
    };
}

// Draw the polar function
function drawPolarFunction(polarFunc, n, ctx, thetaStep = 0.01) {

    let scaleFactor = parseFloat(document.getElementById('zoomInput').value);
    if(!scaleFactor) scaleFactor = 1;

    let startPoint = parseFloat(document.getElementById('lowerLimit').value);
    let endPoint = parseFloat(document.getElementById('upperLimit').value) * Math.PI;

    if(!startPoint) startPoint = 0;
    if(!endPoint) endPoint = 2 * Math.PI;

    ctx.clearRect(0, 0, width, height); // Clear canvas

    let rounded = n.toFixed(2);

    document.getElementById('nValue').innerText = `n = ${rounded}`

    ctx.beginPath();
    for (let theta = startPoint; theta <= endPoint; theta += thetaStep) {
        const r = polarFunc(theta, n);
        if (!isFinite(r)) continue; // Skip discontinuities in the function
        const { x, y } = polarToCartesian(centerX, centerY, r * 150 * scaleFactor, theta);

        // Move to the first point or draw a line
        if (theta === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgb(0, 210, 247)';
    ctx.lineWidth = 0.8;
    ctx.stroke();
}

// Define the polar function r = tan(n * θ)
function tanPolarFunction(theta, n) {
    let x = sinPolarFunction(theta, n)/cosPolarFunction(theta, n);
    return x;
}

function sinPolarFunction(theta, n) {
    let x = Math.sin(n * theta);
    return x;
}

function cosPolarFunction(theta, n) {
    let x = Math.cos(n * theta);
    return x;
}

function parseTrigExpression(expression) {
    // Step 1: Clean up and prepare the expression
    // Step 2: Parse the cleaned expression
    return expression
    .replace(/sin\(([^)]+)\)/g, 'Math.sin($1)')
    .replace(/cos\(([^)]+)\)/g, 'Math.cos($1)')
    .replace(/tan\(([^)]+)\)/g, 'Math.tan($1)')
    
        
        .replace(/(\d)([a-zA-Z(])/g, '$1 * $2') // Add implicit multiplication
        .replace(/\)(?=[a-zA-Z0-9])/g, ') * ') // Handle missing multiplication after parentheses
        .replace(/\bt\b/g, 'theta') // Replace `t` with `theta`
        .replace(/\bp\b/g, 'Math.PI'); // Replace `p` with `Math.PI`
}

function playSlider() {
    clearInterval(interval);
    isPlaying = !isPlaying;
    text = document.getElementById('button').innerText;
    if(text=="Play") document.getElementById('button').innerText="Stop";
    else document.getElementById('button').innerText="Play";
    interval = setInterval(() => {
        const max = parseFloat(slider.max);
        const step = parseFloat(slider.step);
        
        let value = parseFloat(slider.value);

        if (value >= max) {
            slider.value = 0.01;
        } else if(isPlaying == true) {
            slider.value = value + step;
            const n = parseFloat(slider.value);
            drawPolarFunction(tanPolarFunction, n, ctx);
            drawPolarFunction(sinPolarFunction, n, sinctx);
            drawPolarFunction(cosPolarFunction, n, cosctx);
            drawCustomPolarFunction(expr, customctx, n);

        }
    }, 1); // Adjust speed
}

function drawCustomPolarFunction(expression, ctx, n, thetaStep = 0.01) {
    try {
        let customHeight = 500;
        let customWidth = 500;
        let customCenterX = customWidth / 2;
        let customCenterY = customHeight / 2;
        let scaleFactor = parseFloat(document.getElementById('zoomInput').value);
        if (!scaleFactor) scaleFactor = 1;

        let startPoint = parseFloat(document.getElementById('lowerLimit').value);
        let endPoint = parseFloat(document.getElementById('upperLimit').value) * Math.PI;

        if(!startPoint) startPoint = 0;
        if(!endPoint) endPoint = 2 * Math.PI;

        ctx.clearRect(0, 0, customWidth, customHeight); // Clear canvas

        let parsedExpression = parseTrigExpression(expression); // Parse the input
        const compiledExpression = new Function("theta", "n", `return ${parsedExpression};`);

        ctx.beginPath();
        for (let theta = 0; theta <= 2 * Math.PI; theta += thetaStep) {
            const r = compiledExpression(theta, n);
            if (!isFinite(r)) continue; // Skip discontinuities in the function
            const { x, y } = polarToCartesian(customCenterX, customCenterY, r * 175, theta);

            // Move to the first point or draw a line
            if (theta === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgb(0, 210, 247)'; // A distinctive color for the custom plot
        ctx.lineWidth = 3;
        ctx.stroke();

        // Hide the error label if successful
        document.getElementById('errorLabel').style.display = 'none';
    } catch (e) {
        console.error("Error evaluating custom polar function:", e);
        // Display the error message
        document.getElementById('errorLabel').innerText = "Error: " + e.message +".";
        document.getElementById('errorLabel').style.display = 'flex';
    }
}


//EVENT LISTENERS

document.getElementById('intControl').addEventListener('input', () => {
    const n = parseFloat(document.getElementById('intControl').value); // Get n value from input
    let rounded = n.toFixed(2);
    document.getElementById('nValue').innerText = `r = ${rounded}`;
    drawPolarFunction(tanPolarFunction, n, ctx);
    drawPolarFunction(sinPolarFunction, n, sinctx);
    drawPolarFunction(cosPolarFunction, n, cosctx);
    drawCustomPolarFunction(expr, customctx, n);
    if(isPlaying) isPlaying = !isPlaying;
    document.getElementById('button').innerText = "Play";
})

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('customInput').value = "cos(sin(n * t))";
    expr = document.getElementById('customInput').value;
    drawCustomPolarFunction(expr, customctx, 0.01);
    drawPolarFunction(tanPolarFunction, 0.01, ctx);
    drawPolarFunction(sinPolarFunction, 0.01, sinctx);
    drawPolarFunction(cosPolarFunction, 0.01, cosctx);
    document.getElementById('intControl').value = 0.01;
});

document.getElementById('customInput').addEventListener('input', () => {
    const n = parseFloat(document.getElementById('intControl').value); // Get n value from input
    expr = document.getElementById('customInput').value;
    drawCustomPolarFunction(expr, customctx, n);
});






