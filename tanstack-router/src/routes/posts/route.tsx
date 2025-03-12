import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/posts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className="border-b border-slate-700 pb-4">/posts layout</div>
      <div className="pt-12">
        <Outlet />
      </div>
    </div>
  );
}
