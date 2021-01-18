"use strict";

const circle = document.querySelector(".ring__progress");
const closeBtn = document.querySelector(".heading__close");
const modal = document.querySelector(".modal");
const settings = document.querySelector(".settings__icon");
const navActive = document.querySelector(".nav-menu__item--active");

const display = document.querySelector(".timer__display");

const applyButton = document.querySelector(".apply__button");
const stopWatch = document.querySelector(".stopwatch__button");

const colorButtons = document.querySelectorAll(".color-picker__colors");
const pomodoroInput = document.getElementById("pomodoro");

const radius = circle.r.baseVal.value;

const circumference = radius * 2 * Math.PI;

let shitfuck = parseInt(pomodoroInput.defaultValue) * 60;

let theTime = shitfuck;
let cuntshit = theTime;

let timer;

let isRunning = false;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(value) {
	const offset = (value / cuntshit) * circumference;
	circle.style.strokeDashoffset = offset;
}

stopWatch.addEventListener("click", () => {
	isRunning = !isRunning;
	stopWatch.textContent = isRunning ? "pause" : "start";
	if (isRunning) {
		startTimer();
	} else {
		stopTimer();
	}
});

colorButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		const btnColor = e.target.getAttribute("data-color");
		circle.style.stroke = btnColor;
		applyButton.style.backgroundColor = btnColor;
		navActive.style.backgroundColor = btnColor;
		if (e.target.classList.contains("button--active")) {
			return;
		} else {
			console.log(btnColor);
			e.target.parentElement
				.querySelectorAll(".button--active")
				.forEach((e) => e.classList.remove("button--active"));
			e.target.classList.add("button--active");
		}
	});
});

closeBtn.addEventListener("click", () => {
	modal.classList.add("hidden");
});

settings.addEventListener("click", () => {
	modal.classList.remove("hidden");
});

const startTimer = () => {
	tickClock();

	timer = setInterval(() => {
		tickClock();
	}, 1000);
};

function tickClock() {
	let minutesLeft = parseInt(theTime / 60, 10);
	let secondsLeft = parseInt(theTime % 60, 10);

	minutesLeft = minutesLeft < 10 ? "0" + minutesLeft : minutesLeft;
	secondsLeft = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;
	if (theTime < 0) {
		clearInterval(timer);
		return;
	} else {
		setProgress(theTime);
		theTime--;

		display.innerHTML = `${minutesLeft} : ${secondsLeft}`;

		console.log(minutesLeft, secondsLeft, theTime, cuntshit);
	}
}

const stopTimer = () => {
	clearInterval(timer);
	return;
};
