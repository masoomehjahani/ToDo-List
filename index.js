// SELECTOR:
const todoInput= document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todoList");
const filterOption = document.querySelector(".filter-todos");

// event listener:
todoButton.addEventListener("click" , addTodo);
todoList.addEventListener("click",checkRemove);
filterOption.addEventListener("click",filterTodo);
document.addEventListener("DOMContentLoaded",getLocalTodos);
//FUNCTION:
function addTodo(e){
// button have an event
// button submit refresh the form,for prevent this writh:
 e.preventDefault();
 //console.log(e);
 const todoDiv = document.createElement("div");
 todoDiv.classList.add("todo");
 const newTodo=
 `<li>${todoInput.value}</li>
 <span><i class="fas fa-check-square"></i></span>
 <span><i class="fas fa-trash-alt"></i></span>`;
 todoDiv.innerHTML=newTodo;
 // add to dom:
 todoList.appendChild(todoDiv);
 saveLocalTodos(todoInput.value);
 todoInput.value="";
}

function checkRemove(e){
    const item= e.target;
//console.log(item.classList);
// console.log(item.parentElement.parentElement);
const classList = [...e.target.classList];
//console.log(classList);
if (classList[1] === "fa-check-square"){
const todo = item.parentElement.parentElement;

// you can add style by class or directly here add style!
todo.classList.toggle("completed");
}
else if (classList[1] === "fa-trash-alt"){
const todo = item.parentElement.parentElement;
removeLocalTodos(todo);
todo.remove();
}
}

function filterTodo(e){
    console.log(e.target.value);
    // childNodes: be carful any things in this element even space can be child!!
const todos = [...todoList.childNodes];
todos.forEach(doList => {
    switch (e.target.value) {
        case "all":
            doList.style.display = "flex";  
            break;
        case "completed" :
        if (doList.classList.contains("completed"))
        {
            doList.style.display="flex"; }
        else{
            doList.style.display= "none"; 
        }
           break;
        case "uncompleted":
            if (!doList.classList.contains("completed")){
                doList.style.display = "flex"; }
            else{
                doList.style.display = "none"; 
            }
         break;
    }
});
}
// save in storage: save a string array
// getitem('') 
// setitem('',) as string

// 1-get from user and save in storage
function saveLocalTodos(todo){
    // get from user(in ocasion ): by calling this func in iserted item from client and consider 
    //what is todos param there (generally get from storage)
let savedTodos = localStorage.getItem("todos")?
JSON.parse(localStorage.getItem("todos")): [];

// set in storage:
savedTodos.push(todo);
localStorage.setItem('todos',JSON.stringify(savedTodos));
}

// when browser load for first time ,get from local storage and set on dom to show
function getLocalTodos(){
  //get directly from storage  
let savedTodos = localStorage.getItem("todos")?
JSON.parse(localStorage.getItem("todos")): [];

// add to dom:
savedTodos.forEach( todo =>{
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo=
    `<li>${todo}</li>
    <span><i class="fas fa-check-square"></i></span>
    <span><i class="fas fa-trash-alt"></i></span>`;
    todoDiv.innerHTML=newTodo;
    // add to dom:
    todoList.appendChild(todoDiv);
});
}

function removeLocalTodos(todo){
//get list from storage-filter whit selected item-add to strorage without selected item
//console.log(todo.children[0].innerHTML); innerText ham mishavad
let savedTodos = localStorage.getItem("todos")?
JSON.parse(localStorage.getItem("todos")): [];

const filtersTodos = savedTodos.filter(
t => t != (todo.children[0].innerHTML)
);
localStorage.setItem("todos",JSON.stringify(filtersTodos));
}