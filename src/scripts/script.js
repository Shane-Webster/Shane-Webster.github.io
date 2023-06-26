/* By Shane Webster
 * 2023
 * Portfolio website javascript
 */

var canvas = document.getElementById("background-canvas");

var intensity = 0.5;
var intensityStep = 0.001;
var animationInterval = 10; // Animation frame duration in milliseconds

// Generate the initial pattern seed
var seed = String(Math.random());

//console.log(seed);

var pattern = null;

const canvasOpts = {
    scaling: 'auto',
    applyCssScaling: true
}

//Color palettes
const dark = ['#222253', '#28345A', '#36616C', '#222253'];
const light = ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'];

//Dark mode by default
var colorPalette = dark;

const darkCheckbox = document.getElementsByClassName('theme__toggle')[0];
const paragraphs = document.querySelectorAll('p');
const headings = document.querySelectorAll('h1');

//Listen for checkbox change - change trianglify color palette and text color
darkCheckbox.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
        colorPalette = dark;

        paragraphs.forEach(function (p) {
            p.classList.remove('text-light-mode');
        });
        headings.forEach(function (h1) {
            h1.classList.remove('text-light-mode');
        });
    } else {
        colorPalette = light;

        paragraphs.forEach(function (p) {
            p.classList.add('text-light-mode');
        });
        headings.forEach(function (h1) {
            h1.classList.add('text-light-mode');
        });
    }
})

function generatePattern(seed, colorPalette, intensity) {
    return trianglify({
        seed: seed,
        width: window.innerWidth,
        height: window.innerHeight,
        cellSize: 120,
        variance: 0.75,
        xColors: colorPalette,
        yColors: 'match',
        palette: trianglify.colorbrewer,
        colorFunction: trianglify.colorFunctions.interpolateLinear(intensity),
        strokeWidth: 0,
    })
}

function animate() {
    // Update the intensity value
    intensity += intensityStep;

    // Clamp the intensity within a certain range
    if (intensity <= 0.25 || intensity >= 1.0) {
        intensityStep *= -1;
    }

    pattern = generatePattern(seed, colorPalette, intensity);
    pattern.toCanvas(canvas, canvasOpts);


    // Call animate function again after the specified interval
    setTimeout(animate, animationInterval);
}

animate();