import Animals from "./components/animals/animals";
import Counter from "./components/counter";

function App() {
  return (
    <main
      style={{
        width: "100%",
        height: "100dvh",
        display: "grid",
        placeContent: "center",
        textAlign: "center",
      }}
    >
      <h1>Tanstack Store</h1>
      <div style={{ width: 500 }}>
        <Counter />
        <Animals />
      </div>
    </main>
  );
}

export default App;
