"use strict";

const circle = document.querySelector(".ring__progress");
const closeBtn = document.querySelector(".heading__close");
const modal = document.querySelector(".modal");
const settings = document.querySelector(".settings__icon");
const navActive = document.querySelector(".nav-menu__item--active");
const navButtons = document.querySelectorAll(".nav-menu__item");
const navList = document.querySelector(".nav-menu__items");

const fontStyle = document.querySelectorAll(".font-picker");
const fontMenu = document.querySelector(".font-menu");

const display = document.querySelector(".timer__display");

const applyButton = document.querySelector(".apply__button");
const stopWatch = document.querySelector(".stopwatch__button");

const colorButtons = document.querySelectorAll(".color-picker__colors");

const pomodoroInput = document.getElementById("pomodoro");
const shortBreak = document.getElementById("btn-short");
const sessionFull = document.getElementById("btn-full");

const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

let theTime = parseInt(pomodoroInput.value) * 60;

let timeDivider;
timeDivider = theTime;

let timer;

let colorTheme;

let isRunning = false;
let triggerTime = false;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

console.log(pomodoroInput.value);

document.addEventListener("DOMContentLoaded", () => {
	display.innerText = parseInt(localStorage.getItem("pomodoro"), 10);
	theTime = parseInt(localStorage.getItem("pomodoro"), 10) * 60;
	timeDivider = theTime;
});

pomodoroInput.addEventListener("change", (e) => {
	console.log(e.target.value);
	localStorage.setItem("pomodoro", e.target.value);
	console.log(localStorage);
	theTime = parseInt(localStorage.getItem("pomodoro"), 10) * 60;
	timeDivider = theTime;
	display.innerText = localStorage.getItem("pomodoro");
	console.log(theTime);
});

function startTimer() {
	tickClock();

	timer = setInterval(() => {
		tickClock();
	}, 100);
}

function stopTimer() {
	clearInterval(timer);
	return;
}

function setProgress(value) {
	const offset = (value / timeDivider) * circumference;
	circle.style.strokeDashoffset = offset;
}

function shortTimer() {
	styleChanger(navButtons, "nav-menu__item--active", shortBreak);

	theTime = 60;

	timeDivider = theTime;
	triggerTime = true;

	stopWatch.textContent = isRunning ? "pause" : "start";
}

function styleChanger(target, classname, button) {
	target.forEach((btn) => {
		btn.classList.remove(classname);
		btn.style.backgroundColor = "";
		button.style.backgroundColor = colorTheme;
		button.classList.add(classname);
	});
}

function tickClock() {
	console.log(theTime);
	let minutesLeft = parseInt(theTime / 60, 10);
	let secondsLeft = parseInt(theTime % 60, 10);

	minutesLeft = minutesLeft < 10 ? "0" + minutesLeft : minutesLeft;
	secondsLeft = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;
	if (theTime < 0) {
		if (!triggerTime) {
			clearInterval(timer);
			shortTimer();

			startTimer();
		} else if (triggerTime) {
			clearInterval(timer);
			triggerTime = !triggerTime;
			theTime = localStorage.getItem("pomodoro") * 60;
			timeDivider = localStorage.getItem("pomodoro") * 60;

			styleChanger(navButtons, "nav-menu__item--active", sessionFull);

			startTimer();
			console.log("session");
		}
	} else {
		setProgress(theTime);
		theTime--;
		console.log(triggerTime);

		display.innerHTML = `${minutesLeft} : ${secondsLeft}`;
	}
}

/////////////////////////////////////// Event Listeners

closeBtn.addEventListener("click", () => {
	modal.classList.add("hidden");
});

settings.addEventListener("click", () => {
	modal.classList.remove("hidden");
});

stopWatch.addEventListener("click", () => {
	isRunning = !isRunning;
	stopWatch.textContent = isRunning ? "pause" : "start";

	if (isRunning) {
		startTimer();
	} else {
		stopTimer();
	}
});

fontMenu.addEventListener("click", (e) => {
	document.body.style.fontWeight = e.target.dataset.weight;
	document.body.style.fontStyle = e.target.dataset.style;
	e.target.style.fontWeight = e.target.dataset.weight;
	e.target.style.fontStyle = e.target.dataset.style;
	if (e.target.classList.contains("font-picker--active")) return;
	fontStyle.forEach((font) => {
		font.classList.remove("font-picker--active");
		e.target.classList.add("font-picker--active");
	});
	console.log(document.body.style.fontWeight, document.body.style.fontStyle);
});

navList.addEventListener("click", (e) => {
	const targetButton = e.target;
	theTime = parseInt(targetButton.dataset.default) * 60;
	timeDivider = theTime;

	console.log(theTime, timeDivider);
	if (targetButton.classList.contains("nav-menu__item--active")) {
		return;
	} else {
		if (!targetButton.classList.contains("nav-menu__items")) {
			display.innerText = targetButton.dataset.default;

			styleChanger(navButtons, "nav-menu__item--active", targetButton);
		}
	}
});

colorButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		let btnColor = e.target.getAttribute("data-color");
		colorTheme = btnColor;
		circle.style.stroke = btnColor;
		applyButton.style.backgroundColor = btnColor;
		console.log(colorTheme);

		if (e.target.classList.contains("button--active")) {
			return;
		} else {
			e.target.parentElement
				.querySelectorAll(".button--active")
				.forEach((e) => e.classList.remove("button--active"));
			e.target.classList.add("button--active");
		}
	});
});
