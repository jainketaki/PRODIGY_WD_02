const menuToggle = document.querySelector('.toggle');
      const showcase = document.querySelector('.showcase');

      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        showcase.classList.toggle('active');
      })
      let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

function startPause() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.innerHTML = timeToString(elapsedTime);
        }, 10);
        startPauseButton.innerHTML = "Pause";
        running = true;
    } else {
        clearInterval(timerInterval);
        startPauseButton.innerHTML = "Start";
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    display.innerHTML = "00:00:00.00";
    startPauseButton.innerHTML = "Start";
    elapsedTime = 0;
    running = false;
    lapsContainer.innerHTML = "";
    lapCounter = 0;
}

function lap() {
    if (running) {
        lapCounter++;
        const lapTime = timeToString(elapsedTime);
        const lapElement = document.createElement('div');
        lapElement.className = 'lap-time';
        lapElement.innerHTML = `Lap ${lapCounter}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
        
    }
}

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
