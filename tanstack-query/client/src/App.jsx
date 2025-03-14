import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "./App.css";
import { useState } from "react";
import Spinner from "./components/Spinner";

const DELAY = 500;

function App() {
  const [title, setTitle] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
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

  const { mutate: addTodo, isPending: isAddingTodo } = useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, DELAY));
      const todo = { id: Date.now(), title, completed: false };
      await axios.post("http://localhost:3000/todos/create", todo);
    },
    onSettled: () => {
      setTitle("");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: deleteTodo, isPending: isDeletingTodo } = useMutation({
    mutationFn: async (id) => {
      await new Promise((resolve) => setTimeout(resolve, DELAY));
      await axios.delete("http://localhost:3000/todos/delete", {
        data: { id },
      });
    },
    onMutate: (id) => setDeletingId(id),
    onSettled: () => {
      setDeletingId(null);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: toggleTodoCompleted, isPending: isToggling } = useMutation({
    mutationFn: async (id) => {
      await new Promise((resolve) => setTimeout(resolve, DELAY));
      await axios.post("http://localhost:3000/todos/toggleCompleted", { id });
    },
    onMutate: (id) => setTogglingId(id),
    onSettled: () => {
      setTogglingId(null);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  function handleAddTodo(e) {
    e.preventDefault();
    addTodo();
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
              opacity:
                deletingId === todo.id || togglingId === todo.id ? 0.5 : 1,
              position: "relative",
            }}
            key={todo.id}
          >
            {(deletingId === todo.id || togglingId === todo.id) && (
              <Spinner style={{ left: "50%", transform: "translateX(-50%)" }} />
            )}

            <div>
              <input
                disabled={isAddingTodo || isDeletingTodo || isToggling}
                onChange={() => toggleTodoCompleted(todo.id)}
                checked={todo.completed}
                type="checkbox"
              />
              <span>{todo.title}</span>
            </div>
            <button
              disabled={isDeletingTodo}
              className="danger"
              onClick={() => deleteTodo(todo.id)}
            >
              {deletingId === todo.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </div>

      <div>
        <form onSubmit={handleAddTodo}>
          <input
            disabled={isPending || isAddingTodo}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button disabled={isPending || !title.length || isAddingTodo}>
            {isAddingTodo ? "Adding todo..." : "Add todo"}
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
