import { useStore } from "@tanstack/react-store";
import { Animal, animalsStore } from "../../store";

const Display = ({ animal }: { animal: Animal }) => {
  const count = useStore(animalsStore, (state) => state[animal]);
  return (
    <div>
      {animal} : {count}
    </div>
  );
};

export default Display;
