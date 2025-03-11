import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/articles/$articleId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { articleId } = Route.useParams();

  return <div>Article ID: {articleId}</div>;
}
