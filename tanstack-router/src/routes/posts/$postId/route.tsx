import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId")({
  // In a loader
  // Or in a component
  component: PostComponent,
});

function PostComponent() {
  // In a component!
  const { postId } = Route.useParams();
  return (
    <div>
      <nav>posts/$postId layout</nav>
      <p>Post ID: {postId}</p>
      <Outlet />
    </div>
  );
}
