import { Animal, animalsStore } from "../../store";

const Increment = ({ animal }: { animal: Animal }) => {
  const handleincrementAnimal = () => {
    animalsStore.setState((state) => ({
      ...state,
      [animal]: state[animal] + 1,
    }));
  };
  return <button onClick={handleincrementAnimal}>increment</button>;
};

export default Increment;
