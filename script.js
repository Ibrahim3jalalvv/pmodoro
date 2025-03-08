let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const toggleButton = document.getElementById('toggle');
const taskInput = document.getElementById('task-input');
const taskSubmit = document.getElementById('task-submit');
const taskDisplay = document.getElementById('task-display');
const taskText = document.getElementById('task-text');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update the browser tab title
    document.title = `${timeString} - Pomodoro Timer`;
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                isWorkTime = !isWorkTime;
                timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
                modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
                updateDisplay();
                alert(isWorkTime ? 'Work Time!' : 'Break Time!');
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = 25 * 60;
    modeText.textContent = 'Work Time';
    updateDisplay();
    updateToggleButtonText();
    
    // Reset task
    taskInput.value = '';
    taskDisplay.style.display = 'none';
    document.getElementById('task-dialog').style.display = 'block';
}

function updateToggleButtonText() {
    toggleButton.textContent = isWorkTime ? 'Switch to Break' : 'Switch to Work';
    toggleButton.className = isWorkTime ? 'work-mode' : 'break-mode';
}

function toggleMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    
    // Reset the timer when toggling
    clearInterval(timerId);
    timerId = null;
    updateDisplay();
    updateToggleButtonText();
}

function handleTaskSubmit() {
    const task = taskInput.value.trim();
    if (task) {
        taskText.textContent = task;
        taskDisplay.style.display = 'block';
        document.getElementById('task-dialog').style.display = 'none';
        startTimer(); // Assuming you have a startTimer function
    }
}

// Add event listeners
startButton.addEventListener('click', () => {
    if (!taskDisplay.style.display || taskDisplay.style.display === 'none') {
        // If no task is set, show the task input
        document.getElementById('task-dialog').style.display = 'block';
        taskInput.focus();
    } else {
        // If task is already set, start the timer directly
        startTimer();
    }
});
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', toggleMode);
taskSubmit.addEventListener('click', handleTaskSubmit);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleTaskSubmit();
    }
});

// Initial display update
updateDisplay();
updateToggleButtonText(); 