import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId/$revisionId")({
  // In a loader
  // Or in a component
  component: PostComponent,
});

function PostComponent() {
  // In a component!
  const { revisionId } = Route.useParams();
  return <div>Revision ID: {revisionId}</div>;
}
