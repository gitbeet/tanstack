import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  async function getTodos() {
    const response = await axios.get("http://localhost:3000/todos/get");
    const todos = response.data;
    return todos;
  }

  const addTodoMutation = useMutation({
    mutationFn: async () => {
      const todo = { id: Date.now(), title, completed: false };
      await axios.post("http://localhost:3000/todos/create", todo);
    },
    onSuccess: () => {
      setTitle("");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete("http://localhost:3000/todos/delete", {
        data: { id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const toggleTodoCompletedMutation = useMutation({
    mutationFn: async (id) => {
      await axios.post("http://localhost:3000/todos/toggleCompleted", { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  function handleAddTodo(e) {
    e.preventDefault();
    addTodoMutation.mutate();
  }

  return (
    <>
      <h1>Todos</h1>
      <div>
        {data?.map((todo) => (
          <div
            className="pico-background-slate-850"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingInline: 32,
              paddingBlock: 16,
              marginBlock: 16,
            }}
            key={todo.id}
          >
            <div>
              <input
                onChange={() => toggleTodoCompletedMutation.mutate(todo.id)}
                checked={todo.completed}
                type="checkbox"
              />
              <span>{todo.title}</span>
            </div>
            <button
              className="danger"
              onClick={() => deleteTodoMutation.mutate(todo.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div>
        <form onSubmit={handleAddTodo}>
          <input
            disabled={isPending}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button disabled={isPending || !title.length}>Add todo</button>
        </form>
      </div>
    </>
  );
}

export default App;
