import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <section className="flex items-center justify-center">
      <h1>Hello from /about !</h1>
    </section>
  );
}
