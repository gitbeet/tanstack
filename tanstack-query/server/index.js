const express = require("express");
const cors = require("cors");
let { todos } = require("./todos");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/todos/get", (req, res) => {
  res.json(todos);
});

app.post("/todos/create", (req, res) => {
  const todo = req.body;
  todos = [...todos, todo];
  res.status(200).json({ message: "Todo successfully created" });
});

app.delete("/todos/delete", (req, res) => {
  const { id } = req.body;
  console.log(id);
  if (!id) return res.status(404).json({ message: "ID not found" });
  todos = todos.filter((todo) => todo.id !== id);
  res.status(200).json({ message: "Todo successfully deleted" });
});

app.post("/todos/toggleCompleted", (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(404).json({ message: "ID not found" });
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1)
    return res.status(404).json({ message: "Todo not found" });
  todos[todoIndex].completed = !todos[todoIndex].completed;
  res.status(200).json({ message: "Todo successfully toggled" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
