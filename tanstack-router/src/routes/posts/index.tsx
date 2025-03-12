import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Post } from "../../types";
import LoadingSpinner from "../../components/loading";

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, error, isPending, isSuccess } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  async function getPosts(): Promise<Post[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const postsJSON = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = postsJSON.json();
    return posts;
  }
  return (
    <div className="flex flex-col gap-12 items-center justify-center">
      <h1>Posts</h1>
      {isPending && <LoadingSpinner />}
      {error && <h2>{error.message}</h2>}
      {isSuccess && (
        <ol>
          {data?.slice(0, 15).map((post) => (
            <li className="py-1">
              <span>{post.id}.</span>
              <Link
                className="pl-2"
                params={{ postId: post.id.toString() }}
                to={`/posts/$postId`}
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
