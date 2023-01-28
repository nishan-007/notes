let title = []
let task = []

let deletedTitle = [];
let deletedTask = [];

const outputSection = document.getElementById("output-sec");
const titleInput = document.getElementById("title");
const taskInput = document.getElementById("task");
const deletedItems = document.getElementById("deleted-items")
const todoInputSection = document.getElementById("todo-input-section")
const showButton = document.getElementById("input-button");
const inputWrapper = document.getElementById("input-wrapper");
const modalContainer = document.getElementById("modal");
const eachModalItem = document.getElementById("each-item-wrapper");


function render() {
    outputSection.innerHTML = "";
    for (let i = 0; i < title.length; i++) {
        outputSection.innerHTML += /*html*/ `
    <div class="output-value-wrapper" id="${i}">
        <button onclick="deleteTodo(${i})"><img src="img/bin.png" alt=""></button>
        <h3>${title[i]}</h3>
        <span>${task[i]}</span>
    </div>
    `;
        titleInput.value = "";
        taskInput.value = "";
    }
}

function showTodoInputs() {
    let showButton = document.getElementById("input-button");
    showButton.classList.add("hide-button");
    let inputWrapper = document.getElementById("input-wrapper");
    inputWrapper.classList.add("show-input");
    titleInput.focus();

}

function addToOutputSection() {
    if (titleInput.value.length >= 1 && taskInput.value.length >= 1) {
        title.push(titleInput.value);
        task.push(taskInput.value);
    } else {
        alert("Please add a apropriate Note")
    }
    render();
    saveArrays();
}

function deleteTodo(i) {
    let splicedTitle = title.splice(i, 1)
    let splicedTask = task.splice(i, 1)
    deletedTitle.push(splicedTitle.toString());
    deletedTask.push(splicedTask.toString());
    saveArrays();
    render();
}

function closeTodoInputBox() {
    showButton.classList.remove("hide-button");
    inputWrapper.classList.remove("show-input");
}

function saveArrays() {
    let titleAsText = JSON.stringify(title);
    let taskAsText = JSON.stringify(task);
    let titleDeleted = JSON.stringify(deletedTitle);
    let taskDeleted = JSON.stringify(deletedTask);

    localStorage.setItem("title", titleAsText);
    localStorage.setItem("task", taskAsText);
    localStorage.setItem("deletedTitle", titleDeleted);
    localStorage.setItem("deletedTask", taskDeleted);

}

function loadArrays() {
    let titleAsText = localStorage.getItem("title");
    let taskAsText = localStorage.getItem("task");
    let titleDeleted = localStorage.getItem("deletedTitle");
    let taskDeleted = localStorage.getItem("deletedTask");
    if (titleAsText && taskAsText) {
        title = JSON.parse(titleAsText);
        task = JSON.parse(taskAsText);
    }
    if (titleDeleted && taskDeleted) {
        deletedTitle = JSON.parse(titleDeleted);
        deletedTask = JSON.parse(taskDeleted);
    }
};


function getDeletedItems() {
    if(deletedTask.length <= 0 && deletedTitle.length <= 0){
        alert("No Items found")
    } else {
    modalContainer.style.display = "flex";
    eachModalItem.innerHTML = "";
    for (let i = 0; i < deletedTitle.length; i++) {
        eachModalItem.innerHTML += /*html*/ `
                <div id="each-modal-item${i}" class="each-modal-item">
                    <div class="output-value-wrapper">
                        <h3>${deletedTitle[i]}</h3>
                        <p>${deletedTask[i]}</p>
                    </div>
    `
    }
}
}

loadArrays();

function hideDeleteItems(){
    modalContainer.style.display = "none";
}

function deleteAllItems(){
    deletedTitle.length = 0;
    deletedTask.length = 0;
    hideDeleteItems();
    saveArrays();
}

function deleteSingleItem(i){
    deletedTitle.splice(i, 1);
    deletedTask.splice(i, 1);
    saveArrays();
}

document.addEventListener("click", function (e) {
    if (e.target.closest("#todo-input-section")) {
        return;
    } else if (showButton.classList.contains("hide-button") && inputWrapper.classList.contains("show-input")) {
        closeTodoInputBox();
    }
})

titleInput.addEventListener("keyup", (e) => {
    if(e.key === "Enter"){
        titleInput.nextElementSibling.focus();
    }
})

taskInput.addEventListener("keyup", (e) => {
    if(e.key === "Enter"){
        taskInput.previousElementSibling.focus();
        addToOutputSection();
    }
})