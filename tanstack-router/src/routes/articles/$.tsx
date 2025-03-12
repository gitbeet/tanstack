import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/articles/$")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex justify-center items-center">
      <h1>Hello "/articles/ catch-all route"!</h1>
    </div>
  );
}
