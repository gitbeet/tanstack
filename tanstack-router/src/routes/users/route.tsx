import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/users")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="border-b border-slate-700 pb-4">/users layout</div>
      <div className="pt-12">
        <Outlet />
      </div>
    </>
  );
}
