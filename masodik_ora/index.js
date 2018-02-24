const todoContainer = document.getElementById("todo-container");

const todos = [];

function addTodo(todo){
    todo = todo || {};

    if (typeof todo.label !== "string"){
        throw new Error("todo.label has to be a string")
    }

    if(typeof todo.done !== "boolean"){
        throw new Error("todo.done has to be a string")
    }

    todos.push(todo);

    const new_line = document.createElement("li");
    new_line.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center " + (todo.done ? "list-group-item-success" : "list-group-item-danger"));
    const todoElem = document.createElement("span");
    const todoText = document.createTextNode(todo.label);
    const delTodo = document.createElement("button");
    delTodo.setAttribute("class", "btn");
    delTodo.setAttribute("value", todo.label);
    delTodo.innerHTML = "x";
    delTodo.addEventListener("click", function(){
        todoContainer.removeChild(this.parentElement);
        delete_todo(this.value);
    });

    if(todo.done){
        todoElem.style.textDecoration = "line-through";
    }

    todoElem.appendChild(todoText);
    new_line.appendChild(todoElem);
    new_line.appendChild(delTodo);

    todoElem.parentElement.addEventListener("click", function(){
        todo.done = !todo.done;

        if (todo.done){
            todoElem.parentElement.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center list-group-item-success");
            todoElem.style.textDecoration = "line-through";
        }
        else{
            todoElem.parentElement.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center list-group-item-danger");
            todoElem.style.textDecoration = "";
        }
        save();
    })
    todoContainer.appendChild(new_line);
    save();

}

function save(){
    const json = JSON.stringify(todos);
    localStorage.setItem("todo-state", json);
}

function delete_todo(label){
    for(let idx = 0; idx < todos.length; idx++){
        if(todos[idx].label == label){
            todos.splice(idx, 1);
            save();
        }
    }
}


function inputHandler(){
    const newTodo = document.getElementById("todo-input").value.trim();
    document.getElementById("todo-input").value = "";
    if(!newTodo){
        return;
    }
    
    addTodo({
        label: newTodo,
        done: false
    })
}

document.getElementById("todo-input").addEventListener("keypress", function(){
    if(event.keyCode == 13){
        inputHandler();
    }
});

const savedJson = localStorage.getItem("todo-state");

if(savedJson){
    const lastState = JSON.parse(savedJson);

    for(let idx = 0; idx < lastState.length; idx ++){
        addTodo(lastState[idx]);
    }
}
