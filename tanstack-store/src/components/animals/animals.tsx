import Display from "./display";
import Increment from "./increment";

const Animals = () => {
  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <h5>Animals</h5>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Display animal="dogs" />
        <Increment animal="dogs" />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Display animal="cats" />
        <Increment animal="cats" />
      </div>
    </article>
  );
};

export default Animals;
