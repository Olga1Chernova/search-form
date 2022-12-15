const refs = {
    startButton: document.querySelector('[data-start]'),
    stopButton: document.querySelector('[data-stop]'),
    body: document.querySelector('body'),
}

let bodyColor = null;

refs.stopButton.disabled = true;

refs.startButton.addEventListener('click', () => {
        bodyColor = setInterval(bodyColorChange, 1000);
        refs.startButton.disabled = true;
        refs.stopButton.disabled = false;
});

refs.stopButton.addEventListener('click', () => {
    clearInterval(bodyColor);
    refs.startButton.disabled = false;
    refs.stopButton.disabled = true;
});

function bodyColorChange() {
    refs.body.style.backgroundColor = getRandomHexColor();
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}