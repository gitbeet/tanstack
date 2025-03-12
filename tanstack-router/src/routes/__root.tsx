import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="container ">
      <nav className="flex justify-between border-b border-slate-700 py-4">
        <p>App layout</p>
        <ul className="flex gap-4 items-center">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/articles/$">Articles</Link>
        </ul>
        <div />
      </nav>
      <div className="pt-12">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
});
