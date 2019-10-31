var statusEnums = {
    active: "active",
    complete: "complete",
    delete: "delete"
};
//list of todos
var todos = {
    1: { title: "Learn JavaScript", status: statusEnums.complete },
    2: { title: "Do Assignment on API", status: statusEnums.active },
    3: { title: "Make Front End of API", status: statusEnums.active },
    4: { title: "Update the code for todo application on github", status: statusEnums.active}
};
var next_todo_id = 4;
var TodoOpertations = (function () {
    function TodoOpertations() {
    }
    TodoOpertations.prototype.addTodo = function (title) {
        console.log(todos, next_todo_id);
        todos[next_todo_id++] = { title: title, status: statusEnums.active };
        this.display();
    };
    TodoOpertations.prototype.completeTodo = function (id) {
        var div = document.getElementById("div" + id);
        div.style.backgroundColor = "blue";
        todos[id].status = statusEnums.complete;
        this.display();
    };
    TodoOpertations.prototype.deleteTodo = function (id) {
        todos[id].status = statusEnums.delete;
        this.display();
    };
    TodoOpertations.prototype.saveTodo = function (id) {
        var div = document.getElementById("div" + id);
        todos[id].title = div.innerText;
        this.display();
    };
    TodoOpertations.prototype.updateTodo = function (id) {
        var div = document.getElementById("div" + id);
        div.contentEditable = "" + true;
        div.style.border = "solid";
        var edit = document.getElementById("edit" + id);
        edit.innerText = "save";
        edit.setAttribute("onclick", "TodoList.saveTodo(" + id + ")");
    };
    TodoOpertations.prototype.activateTodo = function (id) {
        todos[id].status = statusEnums.active;
        this.display();
    };
    TodoOpertations.prototype.display = function () {
        var node = document.getElementById("display");
        while (node.hasChildNodes()) {
            node.removeChild(node.lastChild);
        }
        for (var i = 1; i < next_todo_id; i++) {
            var element = document.createElement("div");
            var div = document.createElement("div");
            div.setAttribute("id", "div" + i);
            div.setAttribute("style", "margin-right : 1000px");
            div.innerText = todos[i].title;
            element.appendChild(div);
            if (todos[i].status == statusEnums.delete) {
                element.style.display = "none";
            }
            else {
                if (todos[i].status == statusEnums.active) {
                    div.style.backgroundColor = "#32CD32";
                    var edit_btn = document.createElement("button");
                    edit_btn.innerText = "edit";
                    edit_btn.setAttribute("id", "edit" + i);
                    edit_btn.setAttribute("onclick", "TodoList.updateTodo(" + i + ")");
                    element.appendChild(edit_btn);
                    var comp_btn = document.createElement("button");
                    comp_btn.innerText = "complete";
                    comp_btn.setAttribute("onclick", "TodoList.completeTodo(" + i + ")");
                    element.appendChild(comp_btn);
                }
                else if (todos[i].status == statusEnums.complete) {
                    div.style.backgroundColor = "#1E90FF";
                    var active_btn = document.createElement("button");
                    active_btn.innerText = "Activate";
                    active_btn.setAttribute("onclick", "TodoList.activateTodo(" + i + ")");
                    element.appendChild(active_btn);
                }
                var del_button = document.createElement("button");
                del_button.innerText = "Delete";
                del_button.setAttribute("onclick", "TodoList.deleteTodo(" + i + ")");
                element.appendChild(del_button);
            }
            document.getElementById("display").appendChild(element);
            document.getElementById("display").appendChild(document.createElement("br"));
        }
    };
    return TodoOpertations;
}());
var TodoList = new TodoOpertations();
