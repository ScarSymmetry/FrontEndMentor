"use strict";

const todoContainer = document.querySelector(".todo-list");
const checkMarkAll = document.querySelector(".create-task__btn");
const inputField = document.querySelector(".create-task__text");
const itemsLeft = document.querySelector("#items-counter");
const closeBtn = document.querySelector(".close");
const themeSwitch = document.querySelector(".header__switch");
const check = document.querySelector(".label");
const checkBox = document.querySelector(".checkbox");
const allTodos = document.querySelector(".todo-manage__all");
const activeTodos = document.querySelector(".todo-manage__active");
const completedTodos = document.querySelector(".todo-manage__completed");
const clearCompleted = document.querySelector(".clear");

const statusFilter = document.querySelector(".status-filter");
const managePanel = document.querySelector(".manage-wrapper");

let fuckingArray = JSON.parse(localStorage.getItem("taskArray")) || [];

showStatus();

//Event delegated listeners
document.body.addEventListener("click", (e) => {
	handleCheck(e);
	removeTodo(e);
});

function handleCheck(e) {
	if (e.target.classList.contains("checkbox")) {
		let id = e.target.dataset.id;
		let checkedInput = e.target.checked ? "checked" : false;

		fuckingArray.find((match) => {
			if (match.id == id) {
				match.checked = checkedInput;
			}
		});

		const minusChecked = fuckingArray.filter((t) => t.checked != "checked");
		todosLeft(minusChecked);
	}
}

clearCompleted.addEventListener("click", () => {
	clearChecked();
});

checkMarkAll.addEventListener("click", (e) => {
	fuckingArray.forEach((t) => (t.checked = "checked"));
	document
		.querySelectorAll(".checkbox")
		.forEach((checkbox) => (checkbox.checked = true));
	const checkLeft = fuckingArray.filter((t) => !t.checked);
	todosLeft(checkLeft);
});

function clearChecked() {
	fuckingArray = fuckingArray.filter((t) => !t.checked);
	render(fuckingArray);
	todosLeft(fuckingArray);
	Array.from(managePanel.children).forEach((el) => {
		el.classList.remove("todo-manage--active");
	});
	managePanel.children[0].classList.add("todo-manage--active");
}

// Render view function

function render(array) {
	todoContainer.innerHTML = "";
	array.forEach((t, i) => {
		const grayBox = document.createElement("div");
		grayBox.classList.add("gray-box");

		grayBox.innerHTML = ` <div class="new-todos__item">
            <div class="checkbox-wrapper">
              <input type="checkbox" class="checkbox"  data-id="${t.id}"   id="task-${i}" ${t.checked}>
                <label for="task-${i}">
                  <span class="custom-checkbox"></span>
                  <span class="textspan">${t.todo}</span>
                </label>
            </div>
              <button class="close" id=${t.id}>
                <img src="./images/icon-cross.svg" alt="">
              </button>
          </div>`;

		todoContainer.appendChild(grayBox);
		inputField.value = "";

		todosLeft(fuckingArray);
	});
}

// Delete todo from the list

function removeTodo(e) {
	if (e.target.classList.contains("close")) {
		fuckingArray = fuckingArray.filter((t) => t.id != e.target.id);
		render(fuckingArray);
		showStatus();
		let markedRemoved = fuckingArray.filter((t) => t.checked).length;

		itemsLeft.textContent = `${fuckingArray.length - markedRemoved} items left`;
	}
}

function showStatus() {
	fuckingArray.length === 0
		? (statusFilter.style.display = "none")
		: (statusFilter.style.display = "block");
}

inputField.addEventListener("keydown", (e) => {
	if (e.keyCode === 13 && event.target.value.trim() != "") {
		const newTodo = {
			todo: inputField.value,
			checked: false,
			id: Date.now(),
		};
		fuckingArray.push(newTodo);
		render(fuckingArray);
		todosLeft(fuckingArray);
		showStatus();
	}
});

allTodos.addEventListener("click", (e) => {
	render(fuckingArray);
});

completedTodos.addEventListener("click", (e) => {
	const completed = fuckingArray.filter((t) => t.checked);

	render(completed);
	todosLeft(completed);
});

function todosLeft(arr) {
	itemsLeft.textContent = `${arr.length} items left`;
}

activeTodos.addEventListener("click", (e) => {
	const active = fuckingArray.filter((t) => !t.checked);
	render(active);
	todosLeft(active);
});

themeSwitch.addEventListener("click", (e) => {
	document.body.classList.toggle("light");
});

document.addEventListener("click", (e) => {
	if (e.target.parentElement.classList.contains("manage-wrapper")) {
		Array.from(managePanel.children).forEach((el) => {
			el.classList.remove("todo-manage--active");
		});
		e.target.classList.add("todo-manage--active");
	}
});


