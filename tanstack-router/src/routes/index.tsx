import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <section className="flex items-center justify-center">
      <h1>Welcome Home!</h1>
    </section>
  );
}
