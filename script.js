// script.js
const seesaw = document.getElementById('seesaw');
const pivot = document.getElementById('pivot');
const status = document.getElementById('status');
const leftRock = document.getElementById('left-rock');
const rightRock = document.getElementById('right-rock');
const leftWeightInput = document.getElementById('left-weight');
const rightWeightInput = document.getElementById('right-weight');

let pivotPosition = 50; // Initial pivot position (50%)

const weights = {
    left: parseInt(leftWeightInput.value, 10),  // Left rock weight
    right: parseInt(rightWeightInput.value, 10) // Right rock weight
};

const maxTilt = 6; // Maximum seesaw tilt (degrees)

// Set rock sizes proportional to their weights
function setRockSizes() {
    leftRock.style.width = `${weights.left * 5}px`;
    leftRock.style.height = `${weights.left * 5}px`;
    rightRock.style.width = `${weights.right * 5}px`;
    rightRock.style.height = `${weights.right * 5}px`;
}

// Update weights and rock sizes when input changes
leftWeightInput.addEventListener('input', () => {
    weights.left = parseInt(leftWeightInput.value, 10);
    setRockSizes();
    updateSeesaw();
});

rightWeightInput.addEventListener('input', () => {
    weights.right = parseInt(rightWeightInput.value, 10);
    setRockSizes();
    updateSeesaw();
});

// Pivot drag handler
pivot.addEventListener('drag', (event) => {
    if (event.clientX > 0) {
        const containerRect = seesaw.parentElement.getBoundingClientRect();
        const newLeft = ((event.clientX - containerRect.left) / containerRect.width) * 100;

        if (newLeft >= 10 && newLeft <= 90) { // Limit pivot movement range
            pivotPosition = newLeft;
            pivot.style.left = `${pivotPosition}%`;
            updateSeesaw();
        }
    }
});

function calculateTilt() {
    const leftDistance = pivotPosition / 100;
    const rightDistance = (100 - pivotPosition) / 100;

    const leftTorque = weights.left * leftDistance;
    const rightTorque = weights.right * rightDistance;

    const tilt = (rightTorque - leftTorque) * 5; // Calculate tilt (tilt towards heavier side)
    return Math.max(Math.min(tilt, maxTilt), -maxTilt); // Limit maximum tilt
}

function updateSeesaw() {
    const tilt = calculateTilt();
    seesaw.style.transform = `rotate(${tilt}deg)`;
console.debug(tilt);
    if (tilt > -0.1 && tilt < 0.1) {
        status.textContent = '균형을 잘 잡으시네요!';
    } else {
        status.textContent = '균형을 잡으세요!';
    }
}

// Initialize
setRockSizes();
updateSeesaw();