import { createFileRoute } from "@tanstack/react-router";
import LoadingSpinner from "../../../components/loading";
import { useQuery } from "@tanstack/react-query";
import { Post } from "../../../types";

export const Route = createFileRoute("/posts/$postId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = Route.useParams();

  const { data, error, isPending, isSuccess } = useQuery({
    queryKey: ["post"],
    queryFn: getPost,
  });
  async function getPost(): Promise<Post> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const postJSON = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    const post = await postJSON.json();
    return post;
  }

  return (
    <div className="pt-12 flex justify-center items-center">
      {isPending && <LoadingSpinner />}
      {error && <h2>{error.message}</h2>}
      {isSuccess && (
        <div>
          <h1 className="text-center">Post with ID {postId}</h1>
          <h2 className="text-center pt-4">{data.title}</h2>
          <p className="pt-8">{data.body}</p>
        </div>
      )}
    </div>
  );
}
