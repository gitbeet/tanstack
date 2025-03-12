import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId")({
  component: PostComponent,
});

function PostComponent() {
  return (
    <div>
      <div className="border-b border-slate-700 pb-4">posts/$postId layout</div>

      <Outlet />
    </div>
  );
}
