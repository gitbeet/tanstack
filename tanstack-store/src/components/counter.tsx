import { useStore } from "@tanstack/react-store";
import { countStore } from "../store";

const Counter = () => {
  const decrementCount = () => {
    countStore.setState((c) => c - 1);
  };

  const incrementCount = () => {
    countStore.setState((c) => c + 1);
  };

  const count = useStore(countStore);
  return (
    <article>
      <h5>Counter</h5>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button onClick={decrementCount}> - </button>
        <span>Count: {count}</span>
        <button onClick={incrementCount}> + </button>
      </div>
    </article>
  );
};

export default Counter;
