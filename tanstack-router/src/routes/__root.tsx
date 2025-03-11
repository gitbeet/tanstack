import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav style={{ padding: 8 }}>
        <p>App layout</p>
        <ul style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/articles/$">Articles</Link>
        </ul>
        <div />
      </nav>
      <hr />
      <div
      // style={{
      //   display: "grid",
      //   placeContent: "center",
      //   paddingTop: 32,
      // }}
      >
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
