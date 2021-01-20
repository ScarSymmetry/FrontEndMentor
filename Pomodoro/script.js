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
const shortInput = document.getElementById("short-break");
const longInput = document.getElementById("long-break");

const radius = circle.r.baseVal.value;

const circumference = radius * 2 * Math.PI;

let breakTimeShort = parseInt(shortInput.defaultValue) * 60;

let theTime = parseInt(pomodoroInput.defaultValue) * 60;

let timeDivider;
timeDivider = theTime;

let timer;

let colorTheme;

let isRunning = false;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(value) {
	const offset = (value / timeDivider) * circumference;
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
	theTime = parseInt(e.target.dataset.default) * 60;
	timeDivider = theTime;

	console.log(theTime, timeDivider);
	if (e.target.classList.contains("nav-menu__item--active")) {
		return;
	} else {
		if (!e.target.classList.contains("nav-menu__items")) {
			display.innerText = e.target.dataset.default;
			navButtons.forEach((e) => {
				e.classList.remove("nav-menu__item--active");
				e.style.backgroundColor = "";
			});
			e.target.style.backgroundColor = colorTheme;
			e.target.classList.add("nav-menu__item--active");
		}
	}
});

function shortTimer() {
	const shortBreak = document.getElementById("btn-short");
	navButtons.forEach((btn) => {
		btn.classList.remove("nav-menu__item--active");
		btn.style.backgroundColor = "";
		shortBreak.style.backgroundColor = colorTheme;
		shortBreak.classList.add("nav-menu__item--active");
	});

	theTime = parseInt(shortBreak.dataset.default) * 60;

	timeDivider = theTime;
	isRunning = !isRunning;
	stopWatch.textContent = isRunning ? "pause" : "start";
	startTimer();
}

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

closeBtn.addEventListener("click", () => {
	modal.classList.add("hidden");
});

settings.addEventListener("click", () => {
	modal.classList.remove("hidden");
});

function startTimer() {
	tickClock();

	timer = setInterval(() => {
		tickClock();
	}, 1000);
}
const stopTimer = () => {
	clearInterval(timer);
	return;
};

function tickClock() {
	let minutesLeft = parseInt(theTime / 60, 10);
	let secondsLeft = parseInt(theTime % 60, 10);

	minutesLeft = minutesLeft < 10 ? "0" + minutesLeft : minutesLeft;
	secondsLeft = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;
	if (theTime < 0) {
		clearInterval(timer);
		shortTimer();
	} else {
		setProgress(theTime);
		theTime--;

		display.innerHTML = `${minutesLeft} : ${secondsLeft}`;

		console.log(minutesLeft, secondsLeft, theTime, timeDivider);
	}
}
