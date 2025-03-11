import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/posts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <nav>/posts layout</nav>
      <Outlet />
    </>
  );
}
