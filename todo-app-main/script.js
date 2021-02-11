"use strict";

const todoContainer = document.querySelector(".todo-list");
const checkMarkAll = document.querySelector(".check-all");
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
const infoWrapper = document.querySelector(".info-wrapper");
const managePanel = document.querySelector(".manage-wrapper");

let taskArray = JSON.parse(localStorage.getItem("taskArray")) || [];

showStatus();
render(taskArray);

new Sortable(todoContainer, {
	animation: 350,
});

//Event delegated listeners
document.body.addEventListener("click", (e) => {
	handleCheck(e);
	removeTodo(e);
	activeButtons(e);
});

function handleCheck(e) {
	if (e.target.classList.contains("checkbox")) {
		let id = e.target.dataset.id;
		let checkedInput = e.target.checked ? "checked" : false;

		taskArray.find((match) => {
			if (match.id == id) {
				match.checked = checkedInput;
			}
		});

		localStorage.setItem("taskArray", JSON.stringify(taskArray));
		const minusChecked = taskArray.filter((t) => t.checked != "checked");
		todosLeft(minusChecked);
		showStatus();
	}
}

clearCompleted.addEventListener("click", () => {
	clearChecked();
});

checkMarkAll.addEventListener("click", (e) => {
	e.target.classList.toggle("check-all--active");
	let checkLeft;
	if (e.target.classList.contains("check-all--active")) {
		taskArray.forEach((t) => (t.checked = "checked"));

		document
			.querySelectorAll(".checkbox")
			.forEach((checkbox) => (checkbox.checked = true));
		checkLeft = taskArray.filter((t) => t.checked == true);
		todosLeft(checkLeft);
	} else {
		taskArray.forEach((t) => (t.checked = false));

		document
			.querySelectorAll(".checkbox")
			.forEach((checkbox) => (checkbox.checked = false));
		checkLeft = taskArray.filter((t) => t.checked == false);

		todosLeft(checkLeft);
	}
	showStatus();
});

function clearChecked() {
	taskArray = taskArray.filter((t) => !t.checked);
	localStorage.setItem("taskArray", JSON.stringify(taskArray));
	render(taskArray);
	showStatus();
	todosLeft(taskArray);
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

		todosLeft(taskArray);
	});
}

// Delete todo from the list

function removeTodo(e) {
	if (e.target.classList.contains("close")) {
		taskArray = taskArray.filter((t) => t.id != e.target.id);
		render(taskArray);
		showStatus();
		localStorage.setItem("taskArray", JSON.stringify(taskArray));
		let markedRemoved = taskArray.filter((t) => t.checked).length;

		itemsLeft.textContent = `${taskArray.length - markedRemoved} items left`;
	}
}

function showStatus() {
	taskArray.some((el) => el.checked)
		? (clearCompleted.style.display = "block")
		: (clearCompleted.style.display = "none");
	taskArray.length === 0
		? (infoWrapper.style.display = "none")
		: (infoWrapper.style.display = "block");
}

inputField.addEventListener("keydown", (e) => {
	if (e.keyCode === 13 && event.target.value.trim() != "") {
		const newTodo = {
			todo: inputField.value,
			checked: false,
			id: Date.now(),
		};

		taskArray.push(newTodo);
		localStorage.setItem("taskArray", JSON.stringify(taskArray));

		render(taskArray);
		todosLeft(taskArray);

		showStatus();
	}
});

allTodos.addEventListener("click", (e) => {
	render(taskArray);
});

completedTodos.addEventListener("click", (e) => {
	const completed = taskArray.filter((t) => t.checked);

	render(completed);
	todosLeft(completed);
});

function todosLeft(arr) {
	itemsLeft.textContent = `${arr.length} items left`;
}

activeTodos.addEventListener("click", (e) => {
	const active = taskArray.filter((t) => !t.checked);
	render(active);
	todosLeft(active);
});

// Sun-Moon theme button toggler
themeSwitch.addEventListener("click", (e) => {
	document.body.classList.toggle("light");
});

function activeButtons(e) {
	if (e.target.parentElement.classList.contains("manage-wrapper")) {
		Array.from(managePanel.children).forEach((el) => {
			el.classList.remove("todo-manage--active");
		});
		e.target.classList.add("todo-manage--active");
	}
}
