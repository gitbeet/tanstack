import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/articles/first/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/articles/first/"!</div>;
}
