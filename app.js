const { request } = require('express');
const express = require('express');

const app = express();
const port = 8000;

const todos = [
    { id: 1, text: "Brush teeth", completed: false, dueDate: "Monday" },
    { id: 2, text: "Pet dog", completed: false, dueDate: "Monday" },
    { id: 3, text: "Make Coffee", completed: false, dueDate: "Tuesday" },
    { id: 4, text: "Write code", completed: false, dueDate: "Monday" }
]


app.use(express.json());

app.get('/', function(req, res) {
    return res.send('hello');
});

app.get('/todos', function(req, res) {
    return res.send(todos);
});

app.get('/todos/:id', function(req, res) {
    let id;
    let result = {};

    try {
        id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw 'param is not number';
        }
        const todo = todos.find(element => element.id === id);
        if (todo !== undefined) { // could also be written as: if (todo)
            result = todo;
        }

        return res.send(result);
    } catch (error) {
        console.log(error);
        res.status(400).send('bad request.. probably no valid id');
    }
});

app.post('/todos', function (req, res) {
    const bodyTodo = req.body.todo;
    const newId = todos.length+1;
    const newTodo = {
        id: newId,
        text: bodyTodo.text,
        dueDate: bodyTodo.dueDate,
        completed: false
    }
    todos.push(newTodo);
    return res.send(newTodo);
});





app.listen(port, () => {
    console.log(`todo app running, listening on port ${port}`);
});

